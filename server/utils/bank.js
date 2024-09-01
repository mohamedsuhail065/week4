const http = require("https");
const userModel = require("../model/userModel");
require("dotenv").config();
const verifyBankAccount = (request, response) => {
  const { accno, ifsc, email } = request.body;

  // POST request options
  const postOptions = {
    method: "POST",
    hostname: process.env.bank_postHost,
    port: null,
    path: "/v3/tasks/async/verify_with_source/validate_bank_account",
    headers: {
      "x-rapidapi-key": process.env.bank_postApi,
      "x-rapidapi-host": process.env.bank_postHost,
      "Content-Type": "application/json",
    },
  };

  // POST request to get the reqid
  const postReq = http.request(postOptions, function (postRes) {
    const chunks = [];

    postRes.on("data", function (chunk) {
      chunks.push(chunk);
    });

    postRes.on("end", function () {
      const body = Buffer.concat(chunks);
      const parsed = JSON.parse(body.toString());
      const reqid = parsed.request_id;

      console.log(`Request ID: ${reqid}`);

      if (reqid) {
        // Delay the GET request by 5 seconds
        setTimeout(() => {
          const getOptions = {
            method: "GET",
            hostname: process.env.bank_getHost,
            port: null,
            path: `/v3/tasks?request_id=${reqid}`,
            headers: {
              "x-rapidapi-key": process.env.bank_getKey,
              "x-rapidapi-host": process.env.bank_getHost,
            },
          };

          const getReq = http.request(getOptions, function (getRes) {
            const chunks = [];

            getRes.on("data", function (chunk) {
              chunks.push(chunk);
            });

            getRes.on("end", async function () {
              const body = Buffer.concat(chunks);
              const parsed = JSON.parse(body.toString());
              if (parsed[0].result.status === "id_found") {
                await userModel.findOneAndUpdate(
                  { email: email },
                  { accno: accno, isBankVerified: true },
                  { new: true }
                );
                response.status(200).json({ msg: "Verified", sts: 1 });
              } else {
                response.status(200).json({ msg: "Not Verified", sts: 0 });
              }
            });
          });

          getReq.end();
        }, 5000);
      } else {
        console.error("Failed to retrieve reqid");
        response.status(500).send({ error: "Failed to retrieve reqid" });
      }
    });
  });

  postReq.write(
    JSON.stringify({
      task_id: "123",
      group_id: "1234",
      data: {
        bank_account_no: accno,
        bank_ifsc_code: ifsc,
      },
    })
  );
  postReq.end();
};

module.exports = { verifyBankAccount };
