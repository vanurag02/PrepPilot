const mongoose = require("mongoose");

/**
 * - JOB DESCRIPTION : String
 * - RESUME (TEXT) : String
 * - SELF-DESCRIPTION : String
 *
 * - MATCHING SCORE : Number
 *
 * -- TECHNICAL QUESTIONS : [{question:"", intention:"", answer:""}]
 * -- BEHAVIORAL QUESTIONS : [{question:"", intention:"", answer:""}]
 * -- SKILL GAPS : [{skill:"", severity:{type:string, enum:["low", "medium", "high"]}}]
 * -- PREPARATION PLAN : [{day: Number, focus: String, tasks: [String]}]
 *
 */

/* =============== TECHNICAL QUESTIN SCHEMA =============== */
const technicalQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Technical question is required."],
    },
    intention: {
      type: String,
      required: [true, "Intention is required."],
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
  },
  {
    _id: false,
  },
);

/* =============== BEHAVIORAL QUESTIN SCHEMA =============== */
const behavioralQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Behavioral question is required."],
    },
    intention: {
      type: String,
      required: [true, "Intention is required."],
    },
    answer: {
      type: String,
      required: [true, "Answer is required."],
    },
  },
  {
    _id: false,
  },
);

/* =============== SKILL GAP SCHEMA =============== */
const skillGapSchema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "Skill is required."],
    },
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  },
  {
    _id: false,
  },
);

/* =============== PREPARATION PLAN SCHEMA =============== */
const preparationPlanSchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: [true, "Day is required."],
    },
    focus: {
      type: String,
      required: [true, "Focus is required."],
    },
    tasks: {
      type: [String],
      required: [true, "Tasks are required."],
    },
  },
  {
    _id: false,
  },
);

/* =============== INTERVIEW REPORT SCHEMA =============== */
const interviewReportSchema = new mongoose.Schema(
  {
    jobDscrption: {
      type: String,
      required: [true, "Job description is required."],
    },
    resume: {
      type: String,
    },
    selfDescription: {
      type: String,
    },
    matchScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalQuestions: [technicalQuestionSchema],
    behavioralQuestions: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
  },
  {
    timestamps: true,
  },
);

const interviewReportModel = mongoose.Model(
  "InterviewReport",
  interviewReportSchema,
);

module.exports = interviewReportModel;
