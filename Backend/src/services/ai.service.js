const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

const googleResponseSchema = {
  type: "OBJECT",
  properties: {
    matchScore: {
      type: "INTEGER",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description.",
    },
    technicalQuestions: {
      type: "ARRAY",
      description:
        "Technical questions that can be asked in the interview along with intention and answers.",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING", description: "The technical question." },
          intention: {
            type: "STRING",
            description: "The intention behind asking this question.",
          },
          answer: {
            type: "STRING",
            description: "Detailed guide on how to answer this question.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "ARRAY",
      description:
        "Behavioral questions that can be asked in the interview along with intention and answers.",
      items: {
        type: "OBJECT",
        properties: {
          question: { type: "STRING", description: "The behavioral question." },
          intention: {
            type: "STRING",
            description: "The intention behind asking this question.",
          },
          answer: {
            type: "STRING",
            description:
              "Detailed guide on how to answer this question using the STAR method.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "ARRAY",
      description: "List of skill gaps identified in the candidate profile.",
      items: {
        type: "OBJECT",
        properties: {
          skill: { type: "STRING", description: "The missing skill name." },
          severity: {
            type: "STRING",
            description: "The severity level: low, medium, or high.",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "ARRAY",
      description: "A day-by-day roadmap tailored for the candidate.",
      items: {
        type: "OBJECT",
        properties: {
          day: {
            type: "INTEGER",
            description: "The day number starting from 1.",
          },
          focus: {
            type: "STRING",
            description: "The main core focus theme of this day.",
          },
          tasks: {
            type: "ARRAY",
            items: { type: "STRING" },
            description:
              "List of explicit action strings for tasks to execute.",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "STRING",
      description: "The target job title computed from the parameters.",
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
    "title",
  ],
};

/* ==========================================================================
   GENERATION SERVICE FUNCTION
   ========================================================================== */
async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are a professional technical interviewer. Analyze the provided details comprehensively and populate every single element requested in the response schema layout.

  Candidate Profile Context:
  - Resume Content: ${resume}
  - Self Description Notes: ${selfDescription}

  Target Position Criteria:
  - Job Description Profile: ${jobDescription}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Works perfectly with gemini-2.5-flash or gemini-3-flash-preview
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: googleResponseSchema, // Using our raw native object configuration
      },
    });

    const parsedData = JSON.parse(response.text);

    console.dir(parsedData, { depth: null, colors: true });

    return parsedData;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = generateInterviewReport;
