/* =============== IMPORTS =============== */
const mongoose = require("mongoose");

/* =============== BLACKLIST TOKEN SCHEMA =============== */
const blacklistTokenSchema = new mongoose.Schema(
  {
    // STORING JWT TOKEN IN BLACKLIST
    token: {
      type: String,
      required: [true, "Token is required to be added into blacklist."],
    },
  },
  {
    // AUTOMATICALLY ADDS CREATEDAT AND UPDATEDAT FIELDS
    timestamps: true,
  },
);

/* =============== BLACKLIST TOKEN MODEL =============== */
const tokenBlacklistModel = mongoose.model(
  "blacklistToken",
  blacklistTokenSchema,
);

/* =============== EXPORTING MODEL =============== */
module.exports = tokenBlacklistModel;
