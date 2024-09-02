const userModel = require("../model/userModel");
require("dotenv").config();
const aadhar = async (request, res) => {
  const { aadhar, email } = request.body;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apy-token": process.env.Aadhar_token,
    },
    body: JSON.stringify({ aadhaar: String(aadhar).trim() }),
  };

  fetch("https://api.apyhub.com//validate/aadhaar", options)
    .then((response) => response.json())
    .then((data) => {
      if (data.data === true) {
        res.json({ sts: 1 });
        return userModel.findOneAndUpdate(
          { email: email },
          { aadharNumber: aadhar },
          { new: true }
        );
      }
      else{
        res.json({msg:"invalid aadhar"})
      }
    })
    .catch((err) => console.error(err));
};

module.exports = aadhar;
