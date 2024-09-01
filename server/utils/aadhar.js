const userModel = require("../model/userModel");

const aadhar = async (request, res) => {
  const { aadhar, email } = request.body;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apy-token":
        "APY0IihDuY1vtsUotdkaD54BqDuaCovV8eLl90MC21AjBCsH52xofnGRowdErDIPjPEnBxfZnKZq",
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
    })
    .catch((err) => console.error(err));
};

module.exports = aadhar;
