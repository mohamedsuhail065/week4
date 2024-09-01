const http = require("https");
const userModel = require("../model/userModel");
require("dotenv").config();
const panVerification = async (request, respons) => {
  const { email, pan } = request.body;
  const options = {
    method: "POST",
    hostname: process.env.pan_Host,
    port: null,
    path: "/validation/api/v1/panverification",
    headers: {
      "x-rapidapi-key": process.env.pan_API,
      "x-rapidapi-host": process.env.pan_Host,
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", async function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      const parsed = JSON.parse(body);
      if (parsed.status === "success") {
        await userModel.findOneAndUpdate(
          { email: email },
          { pan: pan },
          { new: true }
        );
        respons.send({ message: "pan is valid", sts: 1 });
      } else {
        respons.send({ message: "pan is not valid", sts: 0 });
      }
    });
  });

  req.write(
    JSON.stringify({
      pan: pan.trim().toUpperCase(),
      consent: "yes",
      consent_text:
        "I hear by declare my consent agreement for fetching my information via AITAN Labs API",
    })
  );
  req.end();
};

module.exports = panVerification;
