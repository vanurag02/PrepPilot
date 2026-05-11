/* =============== IMPORTS =============== */
const mongoose = require("mongoose");

/* =============== FUNCTION TO CONNECT TO DATABASE =============== */
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully.");
  } catch (error) {
    console.error(error.message);
  }
}

/* =============== EXPORTING FUNCTION =============== */
module.exports = connectToDB;
