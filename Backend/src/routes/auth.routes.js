/* =============== IMPORTS =============== */
const express = require("express");
const authRouter = express.Router();

/* =============== CONTROLLERS =============== */
const authController = require("../controllers/auth.controller.js");

/* =============== MIDDLEWARES =============== */
const authMiddleware = require("../middlewares/auth.middleware.js");

/* =============== REGISTER USER ROUTE =============== */
/**
@route POST /api/auth/register
@description REGISTER A NEW USER
@access PUBLIC
*/

authRouter.post("/register", authController.registerUserController);

/* =============== LOGIN USER ROUTE =============== */
/**
@route POST /api/auth/login
@description LOGIN USER WITH EMAIL AND PASSWORD
@access PUBLIC
*/

authRouter.post("/login", authController.loginUserController);

/* =============== LOGOUT USER ROUTE =============== */
/**
@route GET /api/auth/logout
@description REMOVE TOKEN FROM COOKIE AND ADD TOKEN TO BLACKLIST
@access PUBLIC
*/

authRouter.get("/logout", authController.logoutUserController);

/* =============== GET LOGGED IN USER ROUTE =============== */
/**
@route GET /api/auth/get-me
@description GET DETAILS OF THE LOGGED IN USER
@access PRIVATE
*/

authRouter.get(
  "/get-me",
  authMiddleware.authUser,
  authController.getMeController,
);

/* =============== EXPORTING ROUTER =============== */
module.exports = authRouter;
