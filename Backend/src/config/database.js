/* =============== IMPORTS =============== */
const mongoose = require("mongoose");

/* =============== FUNCTION TO CONNECT TO DATABASE =============== */
async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });

    console.log("Database connected successfully.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

/* =============== EXPORTING FUNCTION =============== */
module.exports = connectToDB;
