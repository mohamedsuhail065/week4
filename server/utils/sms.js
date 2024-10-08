const userModel = require("../model/userModel");
require('dotenv').config()

const otpSms = (req, res) => {
  const accountSid = "AC5a4324a50429db1254526e90e8419cca";
  const authToken = "957ec0f002f4ea6f489da7c55d6a5298";
  const client = require("twilio")(accountSid, authToken);
  const { phone } = req.body;

  client.verify.v2
    .services("VA15543e157f61ee0619235553db48946b")
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
  const accountSid = "AC5a4324a50429db1254526e90e8419cca";
  const authToken = "957ec0f002f4ea6f489da7c55d6a5298";
  const client = require("twilio")(accountSid, authToken);

  try {
    const verificationCheck = await client.verify.v2
      .services("VA15543e157f61ee0619235553db48946b")
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
