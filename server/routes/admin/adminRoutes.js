import express from "express";
import {
  getPendingRecruiters,
  approveRecruiter,
  rejectRecruiter,
} from "../../controllers/admin/adminRecruiter.js";

import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isAdmin } from "../../middlewares/role/middleware.js";
import { authorizeRoles } from "../../middlewares/authorize/middleware.js";
import {
  generateReport,
  getAllUsers,
  getGraphAnalytics,
  getReports,
  updateUserStatus,
} from "../../controllers/admin/adminController.js";

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

router.get(
  "/manage/users",
  authMiddleware,
  authorizeRoles("admin"),
  getAllUsers,
);

router.patch(
  "/manage/user/:userId",
  authMiddleware,
  authorizeRoles("admin"),
  updateUserStatus,
);
router.post(
  "/reports/generate",
  authMiddleware,
  authorizeRoles("admin"),
  generateReport,
);

router.get("/reports", authMiddleware, authorizeRoles("admin"), getReports);

router.get(
  "/reports/graph",
  authMiddleware,
  authorizeRoles("admin"),
  getGraphAnalytics,
);

export default router;
