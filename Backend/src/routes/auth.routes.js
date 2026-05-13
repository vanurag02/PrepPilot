/* =============== EXPRESS IMPORT =============== */
const express = require("express");
const authRouter = express.Router();

/* =============== AUTH CONTROLLER =============== */
const authController = require("../controllers/auth.controller.js");
/**
 @route POST /api/auth/register
 @description REGISTER A NEW USER
 @access PUBLIC
 */

authRouter.post("/register", authController.registerUserController);

/* =============== LOGIN CONTROLLER =============== */
/**
@route POST /api/auth/login
@description LOGS IN USER WITH EMAIL AND PASSWORD
@access PUBLIC
*/

authRouter.post("/login", authController.loginUserController);

/* =============== LOGOUT CONTROLLER =============== */
/**
@route GET /api/auth/logout
@description CLEAR THE TOKEN FROM USER COOKIES AND BLACKLIST THE TOKEN
@access PUBLIC
*/

authRouter.get("/logout");

module.exports = authRouter;
