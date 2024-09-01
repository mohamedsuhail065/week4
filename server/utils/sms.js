const userModel = require("../model/userModel");
require('dotenv').config()

const otpSms = (req, res) => {
  const accountSid = process.env.twilio_SID;
  const authToken = process.env.twilio_Token;;
  const client = require("twilio")(accountSid, authToken);
  const { phone } = req.body;

  client.verify.v2
    .services("VAcae70114ef2cb9de181436c6e278a05f")
    .verifications.create({ to: `+91${phone}`, channel: "sms" })
    .then((verification) => {
      res.status(200).json({ msg: "Otp sent successfully", verification });
    })
    .catch((error) => {
      console.error("Error sending OTP:", error);
      res.status(500).json({ msg: "Failed to send OTP", error: error.message });
    });
};

const otpSmsVerify = async (req, res) => {
  const { phone, otp } = req.body;
  const accountSid = process.env.twilio_SID;
  const authToken = process.env.twilio_Token;
  const client = require("twilio")(accountSid, authToken);

  try {
    const verificationCheck = await client.verify.v2
      .services("VAcae70114ef2cb9de181436c6e278a05f")
      .verificationChecks.create({ to: `+91${phone}`, code: otp });

    if (verificationCheck.status === "approved") {
      const user = await userModel.findOneAndUpdate(
        { phone },
        { isPhoneVerified: true },
        { new: true }
      );

      res.status(200).json({
        msg: "OTP verified successfully",
        verificationCheck,
        user,
      });
    } else {
      res.status(400).json({ msg: "Invalid OTP", verificationCheck });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ msg: "Failed to verify OTP", error: error.message });
  }
};

module.exports = { otpSms, otpSmsVerify };
