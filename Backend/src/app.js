/* =============== EXPRESS IMPORT =============== */
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

/* =============== MIDDLEWARES =============== */
app.use(express.json());
app.use(cookieParser());

/* =============== AUTH ROUTER =============== */
const authRouter = require("./routes/auth.routes.js");
app.use("/api/auth", authRouter);

/* =============== APP EXPORT =============== */
module.exports = app;
