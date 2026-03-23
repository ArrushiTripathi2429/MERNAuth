import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";
import transporter from "../config/nodemailer.js";

// register function
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "missing details" });
  }
  try {
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new usermodel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production",
      name: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    // welcoming email here...
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to my App",
      text: `welcome to my app yuor account has been  reated with email id: ${email}`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// login function

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({
      success: false,
      message: "email and password are required",
    });
  }
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "invalid email" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production",
      name: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// logout function
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production",
      name: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "logged out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
//otp veriication
export const sendverifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await usermodel.findById(userId);
    if (user.isAccountVerifid) {
      return res.json({ success: false, message: "Account already verified" });
    }

    //6 digit random number
    const Otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = Otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account verification otp",
      text: `your otp is ${Otp}. verify your account using this otp.`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "verification otp sent on email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { userId, Otp } = req.body;
  if (!userId || !Otp) {
    return res.json({ success: false, message: "missing details" });
  }
  try {
    const user = await usermodel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    if (user.verifyOtp === "" || user.verifyOtp !== Otp) {
      return res.json({ success: false, message: "invalid OTP" });
    }
    if (user.verifyOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: " OTP Expired" });
    }
    user.isAccountVerifid = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;
    await user.save();
    return res.josn({ success: true, message: "email verified successfully" });
  } catch (error) {
    return res.josn({ success: false, messsage: error.message });
  }
};
export const isauthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: true, message: error.message });
  }
};
//password reset otp
export const passwordResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "email is required" });
  }
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }

    const Otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = Otp;
    user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "password reset otp",
      text: `your otp is ${Otp}. reset your password using this otp.`,
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "otp sent to your email" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// reset user password

export const resetPassword = async (req, res) => {
  const { email, Otp, newPassword } = req.body;
  if (!email || !Otp | !newPassword) {
    return res.json({
      success: false,
      message: "email/OTP/ new password are required",
    });
  }
  try {
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.josn({ sucess: false, message: "user not found" });
    }
    if (user.resetOtp === " " || user.resetOtp !== Otp) {
      return res.json({ success: false, message: "invalid OTP" });
    }
    if (user.resetOtpExpiresAt < Date.now()) {
      return res.json({ success: false, message: "otp expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiresAt = 0;
    await user.save();

    return res.json({
      success: true,
      message: "password has been changed successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
