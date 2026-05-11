/* =============== USER MODEL IMPORT =============== */
const userModel = require("../models/user.model.js");

/**
@name - registerUserController
@description REGISTER A NEW USER, EXPECTS USERNAME, EMAIL, AND PASSWORD IN THE BODY
@access - PUBLIC
*/

async function registerUserController(req, res) {
  const { username, email, password } = req.body;

  // CHECKING THE INPUTS
  if (!userName || !email || !password) {
    return res.status(400).json({
      message: "Please provide username, email, and password.",
    });
  }

  // CHECKING IF USER ALREADY EXIST
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "Account already exist with this username or email",
    });
  }
}
module.exports = {
  registerUserController,
};
