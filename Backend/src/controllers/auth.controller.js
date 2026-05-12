/* =============== IMPORTS =============== */
const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =============== REGISTER USER CONTROLLER =============== */
/**
@name - registerUserController
@description REGISTER A NEW USER, EXPECTS USERNAME, EMAIL, AND PASSWORD IN THE BODY
@access PUBLIC
*/

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  // CHECKING THE INPUT
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email, and password.",
    });
  }

  // CHECKING IF USER ALREADY EXIST
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // CHECKING IF ALREADY EXIST WITH USERNAME AND EMAIL
  if (isUserAlreadyExist) {
    // USER ALREADY EXIST WITH USERNAME
    if (isUserAlreadyExist.username === username) {
      return res.status(400).json({
        message: "Account with this username already exist.",
      });
    }

    // USER ALREADY EXIST WITH EMAIL
    if (isUserAlreadyExist.email === email) {
      return res.status(400).json({
        message: "Account with this email already exist.",
      });
    }
  }

  /* =============== HASHING THE PASSWORD =============== */
  const hash = await bcrypt.hash(password, 10);

  /* =============== CREATING A USER =============== */
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  /* =============== CREATING TOKEN =============== */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  /* =============== SETTING ABOVE TOKEN INTO COOKIE =============== */
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

/* =============== LOGIN USER CONTROL =============== */
/**
@name - loginUserController
@description LOGIN A NEW USER, EXPECTS EMAIL, AND PASSWORD IN THE BODY
@access - PUBLIC
*/

async function loginUserController(req, res) {
  const { email, password } = req.body;

  // CHECK IF ANY USER EXIST WITH THIS EMAIL
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  // CHECKING PASSWORD
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password.",
    });
  }

  /* =============== CREATING TOKEN =============== */
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  /* =============== SETTING ABOVE TOKEN INTO COOKIE =============== */
  res.cookie("token", token);

  res.status(201).json({
    message: "User logged in successfully.",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  registerUserController,
  loginUserController,
};
