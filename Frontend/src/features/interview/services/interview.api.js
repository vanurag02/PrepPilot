import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/**
 * @description SERVICE TO GENERATE INTERVIEW REPORT BASED ON THE USER'S SELF-DESCRIPTION, RESUME, AND JOB DESCRIPTION.
 */
export const generateInterviewReport = async ({
  jobDescription,
  selfDescription,
  resumeFile,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);
  formData.append("resume", resumeFile);

  const response = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

/**
 * @description SERVICE TO GET INTERVIEW REPORT BY INTERVIEW ID.
 */
export const getInterviewReportById = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @description SERVICE TO GET ALL INTERVIEW REPORTS OF LOGGED IN USER.
 */
export const getAllInterviewReports = async () => {
  const response = await api.get("/api/interview/");
  return response.data;
};

/**
 * @description SERVICE TO GENERATE RESUME PDF BASED ON THE USER'S SEFL DESCRIPTION, RESUME CONTENT, AND JON DESCRIPTION.
 */
export const generateResumePdf = async ({ interviewReportId }) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewReportId}`,
    null,
    {
      responseType: "blob",
    },
  );

  return response.data;
};
