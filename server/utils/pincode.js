const http = require("https");
const userModel = require("../model/userModel");

const pincode = async (request, response) => {
  const { pin } = request.body;
  const http = require("https");

  const options = {
    method: "GET",
    hostname: "indian-pincode-2024.p.rapidapi.com",
    port: null,
    path: `/?pincode=${pin}`,
    headers: {
      "x-rapidapi-key": "b1bc7f7eadmsh854f6f7e702c657p1ea4d5jsnd66d85a36251",
      "x-rapidapi-host": "indian-pincode-2024.p.rapidapi.com",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      parsed = JSON.parse(body);
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
