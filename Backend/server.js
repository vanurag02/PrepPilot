/* =============== IMPORTS =============== */
const app = require("./src/app.js");
require("dotenv").config();
const connectToDB = require("./src/config/database");
const {
  resume,
  selfDescription,
  jobDescription,
} = require("./src/services/temp.js");
const generateInterviewReport = require("./src/services/ai.service.js");

/* =============== HOST AND PORT DECLARATION =============== */
const HOST = "127.0.0.1";
const PORT = 3000;

connectToDB();
generateInterviewReport({ resume, selfDescription, jobDescription });

/* =============== SERVER LISTEN =============== */
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
