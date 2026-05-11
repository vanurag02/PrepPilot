/* =============== IMPORTS =============== */
const mongoose = require("mongoose");

/* =============== DEFINING USER SCHEMA =============== */
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: [true, "Username already taken."],
    required: true,
  },
  email: {
    type: String,
    unique: [true, "Account already exist with this email address."],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/* =============== CREATING MODEL FOR COLLECTION =============== */
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
