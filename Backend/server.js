require("dotenv").config();
/* =============== IMPORTS =============== */
const app = require("./src/app.js");
const connectToDB = require("./src/config/database");

/* =============== HOST AND PORT DECLARATION =============== */
const HOST = "127.0.0.1";
const PORT = 3000;

connectToDB();

/* =============== SERVER LISTEN =============== */
app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
