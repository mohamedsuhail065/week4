const mongoose = require("mongoose");

const ConnectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/week4")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};

module.exports = ConnectDb;
