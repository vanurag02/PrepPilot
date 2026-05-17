/* =============== EXPRESS IMPORT =============== */
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

/* =============== MIDDLEWARES =============== */
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
/* =============== AUTH ROUTER =============== */
const authRouter = require("./routes/auth.routes.js");
app.use("/api/auth", authRouter);

/* =============== APP EXPORT =============== */
module.exports = app;
