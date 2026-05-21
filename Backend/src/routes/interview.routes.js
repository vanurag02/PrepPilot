const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const interviewController = require("../controllers/interview.controller");
const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description GENERATE NEW INTERVIEW REPORT ON THE BASIS OF USER'S SELF-DESCRIPTION, RESUME PDF, AND JOB DESCRIPTION.
 * @access private
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);

// ==========================================================================================================

/**
 * @route GET /api/interview/report/:interviewId
 * @description GET INTERVIEW REPORT BY INTERVIEW ID.
 * @access private
 */
interviewRouter.get(
  "/report/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportByIdController,
);

// ==========================================================================================================

/**
 * @route GET /api/interview/
 * @description GET ALL REPORTS OF THE LOGGED IN USER.
 * @access private
 */
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getAllInterviewReportsController,
);

// ==========================================================================================================

/**
 * @route GET /api/interview/resume/pdf
 * @description GENERATE RESUME PDF ON THE BASIS OF USER'S SELF-DESCRIPTION, RESUME CONTENT, AND JOB DESCRIPTION.
 * @access private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authMiddleware.authUser,
  interviewController.generateResumePdfController,
);

// ==========================================================================================================

module.exports = interviewRouter;
