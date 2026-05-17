/* =============== IMPORTS =============== */
const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

/* =============== REGISTER USER CONTROLLER =============== */
/**
@name - registerUserController
@description - REGISTER A NEW USER, EXPECTS USERNAME, EMAIL, AND PASSWORD IN REQUEST BODY
@access - PUBLIC
*/

async function registerUserController(req, res) {
  // GETTING USER INPUT
  const { username, email, password } = req.body;

  // VALIDATING REQUIRED FIELDS
  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email, and password.",
    });
  }

  // CHECKING EXISTING USER
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // CHECKING WHETHER USERNAME OR EMAIL ALREADY EXISTS
  if (isUserAlreadyExist) {
    // USER ALREADY EXISTS WITH THIS USERNAME
    if (isUserAlreadyExist.username === username) {
      return res.status(400).json({
        message: "Account with this username already exist.",
      });
    }

    // USER ALREADY EXISTS WITH THIS EMAIL
    if (isUserAlreadyExist.email === email) {
      return res.status(400).json({
        message: "Account with this email already exist.",
      });
    }
  }

  /* =============== HASHING PASSWORD =============== */
  const hash = await bcrypt.hash(password, 10);

  /* =============== CREATING USER =============== */
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  // CREATING JWT TOKEN
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  // STORING TOKEN IN COOKIE
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/* =============== LOGIN USER CONTROLLER =============== */
/**
@name - loginUserController
@description - LOGIN AN EXISTING USER, EXPECTS EMAIL AND PASSWORD IN REQUEST BODY
@access - PUBLIC
*/

async function loginUserController(req, res) {
  //GETTING USER INPUT
  const { email, password } = req.body;

  //CHECKING USER EXISTENCE
  const user = await userModel.findOne({ email });

  // CHECKING IF USER EXISTS
  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  //VERIFYING PASSWORD
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // CHECKING IF PASSWORD IS VALID
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  //CREATING JWT TOKEN
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  //STORING TOKEN IN COOKIE
  res.cookie("token", token);

  res.status(200).json({
    message: "User logged in successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/* =============== LOGOUT USER CONTROLLER =============== */
/**
@name - logoutUserController
@description - LOGOUT USER BY CLEARING COOKIE TOKEN AND BLACKLISTING THE TOKEN
@access - PUBLIC
*/

async function logoutUserController(req, res) {
  // GETTING TOKEN FROM COOKIES
  const token = req.cookies.token;

  // ADDING TOKEN TO BLACKLIST
  if (token) {
    await tokenBlacklistModel.create({ token });
  }

  // CLEARING TOKEN COOKIE
  res.clearCookie("token");

  res.status(200).json({
    message: "User logged out successfully.",
  });
}

/* =============== GET LOGGED IN USER CONTROLLER =============== */
/**
@name - getMeController
@description - GET DETAILS OF CURRENT LOGGED IN USER
@access - PRIVATE
*/

async function getMeController(req, res) {
  //FETCHING USER DETAILS
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    message: "User details fetched successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/* =============== EXPORTING CONTROLLERS =============== */
module.exports = {
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController,
};
