const userModel = require("../model/userModel");
const https = require("https");
require("dotenv").config();

const gst = async (request, response) => {
  const { gstin, email } = request.body;
  console.log(gstin);

  const options = {
    method: "POST",
    hostname: process.env.gst_Host,
    port: null,
    path: "/v3/tasks/sync/verify_with_source/ind_gst_certificate",
    headers: {
      "x-rapidapi-key": process.env.gst_key,
      "x-rapidapi-host": process.env.gst_Host,
      "Content-Type": "application/json",
    },
  };

  const req = https.request(options, async function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", async function () {
      try {
        const body = Buffer.concat(chunks);
        const parsedBody = JSON.parse(body);
        console.log(parsedBody.result.source_output.gstin_status);

        if (parsedBody.result.source_output.gstin_status === "Active") {
          await userModel.findOneAndUpdate(
            { email: email },
            { gstno: gstin, isGSTVerified: true },
            { new: true }
          );
          response.status(200).send({ message: "GSTIN is Active", sts: 1 });
        } else {
          response.status(200).send({ message: "GSTIN is Inactive", sts: 0 });
        }
      } catch (error) {
        console.error("Error processing GST verification:", error);
        response
          .status(500)
          .send({ message: "Internal Server Error", error: error.message });
      }
    });
  });

  req.on("error", (error) => {
    console.error("Error with HTTP request:", error);
    response
      .status(500)
      .send({ message: "Failed to verify GSTIN", error: error.message });
  });

  req.write(
    JSON.stringify({
      task_id: "74f4c926-250c-43ca-9c53-453e87ceacd1",
      group_id: "8e16424a-58fc-4ba4-ab20-5bc8e7c3c41e",
      data: { gstin: gstin },
    })
  );

  req.end();
};

module.exports = gst;
