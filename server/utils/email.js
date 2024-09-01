const randomstring = require("randomstring");
const nodemailer = require("nodemailer");
const userModel = require("../model/userModel");

function generateOtp() {
  return randomstring.generate({ length: 6, charset: "numeric" });
}

const otpCache = {};

function sendOtp(email, otp) {
  const mailOptions = {
    from: "mohamedsuhail065@gmail.com",
    to: email,
    subject: "OTP for verification",
    text: `Your OTP is ${otp}`,
  };
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mohamedsuhail065@gmail.com",
      pass: "pqlb gshr ptsd jvdu",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Otp email sent successfully", info.response);
    }
  });
}

const emailOtp = (req, res) => {
  const { email } = req.body;
  console.log("Received email:", email); // Debugging line

  if (!email) {
    return res.status(400).json({ msg: "Email is required" });
  }

  const otp = generateOtp();
  otpCache[email] = otp;
  sendOtp(email, otp);
  res.cookie("otpCache", otpCache, { maxAge: 30000, httpONLY: true });
  res.status(200).json({ msg: "Otp sent successfully" });
};

const emailVerify = async (req, res) => {
  const { email, otp } = req.body;

  // Log the received values for debugging
  console.log("Received email:", email);
  console.log("Received OTP:", otp);
  console.log("OTP Cache:", otpCache);

  // Check if the email is not in otpCache
  if (!otpCache.hasOwnProperty(email)) {
    return res.status(400).json({ msg: "Email not found" });
  }

  // Check if the OTP matches the one in the cache
  if (otpCache[email] === otp.trim()) {
    const user = await userModel.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );
    delete otpCache[email];
    return res.status(200).json({ msg: "OTP verified" });
  } else {
    return res.status(400).json({ msg: "Invalid OTP" });
  }
};

module.exports = { emailOtp, emailVerify };
