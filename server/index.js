const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDb = require("./model/DbConfig");
const userrouter = require("./router/userRouter");
const otprouter = require("./router/otpRouter");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.use("/user", userrouter);
app.use("/otp", otprouter);

ConnectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
