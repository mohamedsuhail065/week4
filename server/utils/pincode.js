const http = require("https");
const userModel = require("../model/userModel");
require("dotenv").config();
const pincode = async (request, response) => {
  const { pin } = request.body;
  const http = require("https");

  const options = {
    method: "GET",
    hostname: "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
    port: null,
    path: `/api/v1/pincode/${pin}`,
    headers: {
      "x-rapidapi-key": "b1bc7f7eadmsh854f6f7e702c657p1ea4d5jsnd66d85a36251",
      "x-rapidapi-host":
        "india-pincode-with-latitude-and-longitude.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      const data = JSON.parse(body.toString());
      response.json(data);
    });
  });

  req.end();
};

const postDetails = async (req, res) => {
  const { pin, email, area, district, state } = req.body;
  await userModel.findOneAndUpdate(
    { email: email },
    { address: { pincode: pin, area: area, district: district, state: state } },
    { new: true }
  );
  res.status(200).json("Address updated successfully");
};

module.exports = { pincode, postDetails };
