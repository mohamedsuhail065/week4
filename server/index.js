const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDb = require("./model/DbConfig");
const userrouter = require("./router/userRouter");
const verifyrouter = require("./router/verifyRouter");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

app.use("/user", userrouter);
app.use("/otp", verifyrouter);

ConnectDb();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
