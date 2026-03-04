import express from "express";
import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isStudent } from "../../middlewares/role/middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Student Dashboard",
    user: req.user,
  });
});

export default router;
