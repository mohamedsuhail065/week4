const userModel = require("../model/userModel");

const userRegister = async (req, res) => {
  try {
    const { name, email, phone, dob } = req.body;
    const user = await userModel.findOne({ email: email, phone: phone });
    if (user) {
      return res.status(400).json({ message: "Email or Phone already exists" });
    } else {
      await userModel.create({
        name: name,
        email: email,
        phone: phone,
        dob: dob,
      });

      res.json({ message: "Complete the verification processes" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

const userOtp = async (req, res) => {
  const email = req.query.email;
  user = await userModel.findOne({ email: email });
  res.json(user);
};

const userLogin = async (req, res) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    if (!user.isPhoneVerified && !user.isEmailVerified) {
      res.json({ sts: 1 });
    } else if (!user.aadharNumber) {
      res.json({ sts: 2 });
    } else if (!user.pan) {
      res.json({ sts: 3 });
    } else if (!user.gstno) {
      res.json({ sts: 4 });
    } else if (!user.accno) {
      res.json({ sts: 5 });
    } else if (!user.address.pincode) {
      res.json({ sts: 6 });
    }
  } else {
    res.status(400).json({ message: "Invalid Email or Password" });
  }
};

const userDetails = async (req, res) => {
  const emailid = req.headers["email"];
  const user = await userModel.findOne({ email: emailid });
  res.json(user)
  console.log(user)
};

module.exports = { userRegister, userOtp, userLogin,userDetails };
