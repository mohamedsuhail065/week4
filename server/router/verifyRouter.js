const express = require("express");
const { otpSms, otpSmsVerify } = require("../utils/sms");
const { emailOtp, emailVerify } = require("../utils/email");
const gst = require("../utils/gst");
const { verifyBankAccount } = require("../utils/bank");
const { pincode, postDetails } = require("../utils/pincode");
const aadhar = require("../utils/aadhar");
const panVerification = require("../utils/pan");
const verifyrouter = express.Router();

verifyrouter.route("/sms").post(otpSms);
verifyrouter.route("/sms-verify").post(otpSmsVerify);

verifyrouter.route("/req-otp").post(emailOtp);
verifyrouter.route("/verify-otp").post(emailVerify);

verifyrouter.route("/pan").post(panVerification);

verifyrouter.route("/aadhar").post(aadhar);

verifyrouter.route("/gst").post(gst);

verifyrouter.route("/bank").post(verifyBankAccount);

verifyrouter.route("/pincode").post(pincode);
verifyrouter.route("/pindetails").post(postDetails);
module.exports = verifyrouter;
