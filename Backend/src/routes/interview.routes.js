const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const interviewController = require("../controllers/interview.controller.js");
const upload = require("../middlewares/file.middleware.js");
const interviewRouter = express.Router();

/**
@route POST /api/interview
@description GENERATE INTERVIEW REPORT ON THE BASIS OF USER'S SELF DESCRIPTION, RESUME PDF AND JOB DESCRIPTION
@access PRIVATE
*/

interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterviewReportController,
);

module.exports = interviewRouter;
