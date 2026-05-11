/* =============== EXPRESS IMPORT =============== */
const express = require("express");
const authRouter = express.Router();

/* =============== EXPRESS IMPORT =============== */
const authController = require("../controllers/auth.controller.js");
/**
@route - POST /api/auth/register
@description - REGISTER A NEW USER
@access - PUBLIC
*/

authRouter.post("/register", authController.registerUserController);

module.exports = authRouter;
