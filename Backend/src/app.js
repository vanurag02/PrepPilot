/* =============== EXPRESS IMPORT =============== */
const express = require("express");
const app = express();

app.use(express.json());

/* =============== AUTH ROUTER =============== */
const authRouter = require("./routes/auth.routes.js");
app.use("/api/auth", authRouter);

/* =============== APP EXPORT =============== */
module.exports = app;
