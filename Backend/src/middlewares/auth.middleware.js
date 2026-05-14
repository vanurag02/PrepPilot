/* =============== IMPORTS =============== */
const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.model.js");

/* =============== AUTH USER MIDDLEWARE =============== */
/**
@name - authUser
@description - VERIFY USER TOKEN AND AUTHORIZE PROTECTED ROUTES
@access - PRIVATE
*/

async function authUser(req, res, next) {
  // GETTING TOKEN FROM COOKIES
  const token = req.cookies.token;

  // CHECKING IF TOKEN EXISTS
  if (!token) {
    return res.status(401).json({
      message: "Token not provided.",
    });
  }

  // CHECKING TOKEN BLACKLIST STATUS
  const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

  // CHECKING IF TOKEN IS BLACKLISTED
  if (isTokenBlacklisted) {
    return res.status(401).json({
      message: "Invalid token.",
    });
  }

  try {
    // VERIFYING JWT TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // STORING USER DATA IN REQUEST OBJECT
    req.user = decoded;

    next();
  } catch (error) {
    console.error(error.message);

    return res.status(401).json({
      message: "Invalid token.",
    });
  }
}

/* =============== EXPORTING MIDDLEWARES =============== */
module.exports = { authUser };
