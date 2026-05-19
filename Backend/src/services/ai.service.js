const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEN_AI_API_KEY,
});

const interviewReportSchema = {
  type: "OBJECT",
  properties: {
    matchScore: {
      type: "INTEGER",
      description:
        "A score between 0 and 100 indicating how well the candidate's profile matches the job description",
    },
    technicalQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING",
            description: "The technical question can be asked in the interview",
          },
          intention: {
            type: "STRING",
            description:
              "The intention of interviewer behind asking this question",
          },
          answer: {
            type: "STRING",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          question: {
            type: "STRING",
            description:
              "The behavioral question can be asked in the interview",
          },
          intention: {
            type: "STRING",
            description:
              "The intention of interviewer behind asking this question",
          },
          answer: {
            type: "STRING",
            description:
              "How to answer this question, what points to cover, what approach to take etc.",
          },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          skill: {
            type: "STRING",
            description: "The skill which the candidate is lacking",
          },
          severity: {
            type: "STRING",
            description: "The severity of this skill gap: low, medium, or high",
          },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          day: {
            type: "INTEGER",
            description:
              "The day number in the preparation plan, starting from 1",
          },
          focus: {
            type: "STRING",
            description: "The main focus of this day in the preparation plan",
          },
          tasks: {
            type: "ARRAY",
            items: { type: "STRING" },
            description:
              "List of tasks to be done on this day to follow the preparation plan",
          },
        },
        required: ["day", "focus", "tasks"],
      },
    },
    title: {
      type: "STRING",
      description:
        "The title of the job for which the interview report is generated",
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
        responseSchema: interviewReportSchema, // Using our raw native object configuration
      },
    });

    const parsedData = JSON.parse(response.text);

    console.dir(parsedData, { depth: null, colors: true });

    return parsedData;
  } catch (error) {
    console.error("Error processing generation sequence:", error.message);
  }
}

module.exports = generateInterviewReport;
