import express from "express";
import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isRecruiter } from "../../middlewares/role/middleware.js";

const router = express.Router();

// Recruiter Dashboard
router.get("/dashboard", authMiddleware, isRecruiter, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Recruiter Dashboard",
    user: req.user,
  });
});

export default router;
