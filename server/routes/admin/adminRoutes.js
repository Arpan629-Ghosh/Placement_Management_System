import express from "express";
import {
  getPendingRecruiters,
  approveRecruiter,
  rejectRecruiter,
} from "../../controllers/admin/adminRecruiter.js";

import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isAdmin } from "../../middlewares/role/middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, isAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Dashboard",
    user: req.user,
  });
});

router.get("/recruiters/all", authMiddleware, isAdmin, getPendingRecruiters);

router.patch(
  "/recruiters/:recruiterId/approve",
  authMiddleware,
  isAdmin,
  approveRecruiter,
);

router.patch(
  "/recruiters/:recruiterId/reject",
  authMiddleware,
  isAdmin,
  rejectRecruiter,
);

export default router;
