const express = require("express");
const {
  userRegister,
  userOtp,
  userLogin,
  userDetails,
} = require("../controls/userCtrl");
const userrouter = express.Router();

userrouter.route("/register").post(userRegister);
userrouter.route("/data").get(userOtp);
userrouter.route("/login").post(userLogin);
userrouter.route("/details").get(userDetails);

module.exports = userrouter;
