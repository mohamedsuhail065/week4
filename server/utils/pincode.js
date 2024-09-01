const http = require("https");
const userModel = require("../model/userModel");
require("dotenv").config();
const pincode = async (request, response) => {
  const { pin } = request.body;
  const http = require("https");

  const options = {
    method: "GET",
    hostname: process.env.pin_HOST,
    port: null,
    path: `/?pincode=${pin}`,
    headers: {
      "x-rapidapi-key": process.env.pin_API,
      "x-rapidapi-host": process.env.pin_HOST,
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const parsed = JSON.parse(body);
      response.json(parsed);
    });
  });

  req.end();
};

const postDetails = async (req, res) => {
  const { pin, email, city, district, state } = req.body;
  await userModel.findOneAndUpdate(
    { email: email },
    { address: { pincode: pin, city: city, district: district, state: state } },
    { new: true }
  );
  res.status(200).json("Address updated successfully");
};

module.exports = { pincode, postDetails };
