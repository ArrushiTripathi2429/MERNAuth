import express from "express";
//import {login , logout, register } from "../../controllers/authcontrollers.js";
import {
  register,
  login,
  logout,
  sendverifyOtp,
  verifyEmail,
  isauthenticated,
  resetPassword,
  passwordResetOtp,
} from '../controllers/authcontrollers.js';
import userAuth from "../middleware/userAuth.js";



const authRouter = express.Router();

authRouter.post('/register' , register);
authRouter.post('/login' , login);
authRouter.post("/logout" , logout); 
authRouter.post('/send-verify-otp' , userAuth , sendverifyOtp);
authRouter.post('/verify-email' , userAuth , verifyEmail);
authRouter.post('/is-auth' , userAuth , isauthenticated);
authRouter.post('/send-reset-otp' , userAuth , passwordResetOtp);
authRouter.post('/reset-password' , userAuth , resetPassword);




export default authRouter;  