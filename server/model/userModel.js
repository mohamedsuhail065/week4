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
    isPhoneVerified: { type: Boolean },
    isEmailVerified: { type: Boolean },
    isAadharVerified: { type: Boolean },
    isPANVerified: { type: Boolean },
    isBankVerified: { type: Boolean },
    isGSTVerified: { type: Boolean },
    address: {
      pincode: { type: String },
      city: { type: String },
      district: { type: String },
      state: { type: String },
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user-tbl", userSchema);

module.exports = userModel;
