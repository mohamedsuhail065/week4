const express=require('express')
const {userRegister,userOtp} = require('../controls/userCtrl')
const userrouter=express.Router()

userrouter.route("/register").post(userRegister)
userrouter.route("/data").get(userOtp)

module.exports=userrouter;