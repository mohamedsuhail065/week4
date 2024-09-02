const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    aadharNumber: { type: String },
    gstno: { type: String },
    accno:{type:String},
    pan:{type:String},
    isPhoneVerified: { type: Boolean },
    isEmailVerified: { type: Boolean },
    address: {
      pincode: { type: String },
      area: { type: String },
      district: { type: String },
      state: { type: String },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user-tbl", userSchema);

module.exports = userModel;
