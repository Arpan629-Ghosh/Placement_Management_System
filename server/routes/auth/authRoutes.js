import express from "express";
import {
  forgotPassword,
  logoutUser,
  registerUser,
  resetPassword,
} from "../../controllers/authController.js";
import { verifyEmail } from "../../controllers/authController.js";
import { resendOTP } from "../../controllers/authController.js";
import { loginUser } from "../../controllers/authController.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
