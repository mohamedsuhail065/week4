const express = require("express");
const { otpSms, otpSmsVerify } = require("../controls/otpCtrl");
const { emailOtp, emailVerify } = require("../utils/email");
const gst = require("../utils/gst");
const { verifyBankAccount } = require("../utils/bank");
const { pincode, postDetails } = require("../utils/pincode");
const aadhar = require("../utils/aadhar");
const otprouter = express.Router();

otprouter.route("/sms").post(otpSms);
otprouter.route("/sms-verify").post(otpSmsVerify);

otprouter.route("/req-otp").post(emailOtp);
otprouter.route("/verify-otp").post(emailVerify);

otprouter.route("/aadhar").post(aadhar);

otprouter.route("/gst").post(gst);

otprouter.route("/bank").post(verifyBankAccount);

otprouter.route("/pincode").post(pincode);
otprouter.route("/pindetails").post(postDetails);
module.exports = otprouter;
