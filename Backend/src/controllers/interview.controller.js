const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");
const interviewReportModel = require("../models/interviewReport.model");

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

module.exports = { generateInterviewReportController };
