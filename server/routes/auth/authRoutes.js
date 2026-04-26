import express from "express";
import {
  forgotPassword,
  getMe,
  logoutUser,
  registerUser,
  resetPassword,
  verifyResetOtp,
} from "../../controllers/authController.js";
import { verifyEmail } from "../../controllers/authController.js";
import { resendOTP } from "../../controllers/authController.js";
import { loginUser } from "../../controllers/authController.js";
import { authMiddleware } from "../../middlewares/auth/middleware.js";

const router = express.Router();
router.post("/register", registerUser);
router.get("/me", authMiddleware, getMe); // protect middleware (JWT)
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendOTP);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOtp);
router.post("/reset-password", resetPassword);

export default router;
