import User from "../models/User.js";
import EmailOTP from "../models/EmailOTP.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";

// --> Send Email Helper

const sendOTPEmail = async (EmailOTP, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: EmailOTP,
    subject: "Verify your Email - PMS",
    html: `
      <h3>Your Email Verification Code</h3>
      <p>Your OTP is: <b>${otp}</b></p>
      <p>This OTP will expire in 5 minutes.</p>
      `,
  });
};

//Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check if user exists
    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //Hash password
    const hash = await bcrypt.hash(password, 10);

    //Create user
    const newUser = await User.create({
      name,
      email,
      passwordHash: hash,
      role,
    });

    //Genarate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // save OTP
    await EmailOTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    // send Email
    await sendOTPEmail(email, otp);

    return res.status(201).json({
      message:
        "Registration successful. Check your email for OTP verification. ",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // find otp record
    const otpRecord = await EmailOTP.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({
        message: "OTP not found or expired",
      });
    }

    //check for OTP matching
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    //check expired
    if (otpRecord.expiresAt < new Date()) {
      await EmailOTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    // update user email verified status
    const user = await User.findOne({ email });
    if (!user) {
      await EmailOTP.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(404).json({ message: "User not found" });
    }
    user.emailVerified = true;

    await user.save();

    //delete otp entry
    await EmailOTP.deleteOne({ _id: otpRecord._id });

    return res.status(200).json({
      message: "Email verified successfully",
      userId: user._id,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
    });
  } catch (error) {
    console.error("Error in OTP verification", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.emailVerified) {
      return res.status(400).json({
        message: "Email already verified. No need to resend OTP.",
      });
    }

    await EmailOTP.deleteMany({ email });

    // Genarate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    //Save new OTP
    await EmailOTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    //send email
    await sendOTPEmail(email, otp);
    return res.status(200).json({
      message: "New OTP sent to your email",
    });
  } catch (error) {
    console.error("Resend OTP error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (!user.emailVerified) {
      return res.status(401).json({
        message: "Email is not verified. Verify your email first.",
        success: false,
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        message: `Your account is ${user.status}. Contact admin.`,
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      success: true,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// Reset password controller:
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOTP = await bcrypt.hash(otp, 10);

    user.resetPasswordToken = hashedOTP;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Password Reset OTP",
      html: `
      <p>Your password reset OTP is:</p>
      <h2>${otp}</h2>
      <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "OTP sent to registered email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Forgot password failed",
      error: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (
      !user ||
      !user.resetPasswordToken ||
      user.resetPasswordExpires < Date.now()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Reset password failed",
      error: error.message,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production (https)
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
