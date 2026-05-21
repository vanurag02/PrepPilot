const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

/**
@description CONTROLLER TO GENERATE INTERVIEW REPORT ON THE BASIS OF USER'S SELF DESCRIPTION, RESUME PDF AND JOB DESCRIPTION
*/
async function generateInterviewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume PDF is required.",
      });
    }

    // Parse PDF buffer
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAI = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

/**
@description CONTROLLER TO GENERATE INTERVIEW REPORT ON THE BASIS OF INTERVIEW ID
*/
async function generateInterviewReportByIDController(req, res) {
  const { interviewID } = req.params;

  const interviewReport = await interviewReportModel.findOne({
    _id: interviewID,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({
      message: "Interview report not found.",
    });
  }

  res.status(200).json({
    message: "Interview report fetched successfully.",
    interviewReport,
  });
}

/**
@description CONTROLLER TO GET ALL INTERVIEW REPORTS OF THE LOGGED IN USER.
*/
async function getAllInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    );
}

module.exports = {
  generateInterviewReportController,
  generateInterviewReportByIDController,
  getAllInterviewReportsController,
};
