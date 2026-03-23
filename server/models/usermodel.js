//import { verify } from "jsonwebtoken";
import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyOtp:{
    type:String,
    default:" "
  },
  verifyOtpexpiresAt:{
    type:Number,
    default:0
  },
  isAccountVerified:{
    type: Boolean,
    default: false
  },
  resetOtp:{
    type:String,
    default:" "
  },
  resetOtpexpiresAt:{
    type: Number,
    default:0,
  },

})
const usermodel = mongoose.models.user || mongoose.model('user', userSchema);
export default usermodel;

