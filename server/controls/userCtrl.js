const userModel = require("../model/userModel");

const userRegister = async (req, res) => {
  try {
    const { name, email, phone, dob } = req.body;

    await userModel.create({
      name: name,
      email: email,
      phone: phone,
      dob: dob,
    });

    res.json({ message: "User registered successfully" });
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

module.exports = { userRegister, userOtp };
