import express from "express";

import { authMiddleware } from "../../middlewares/auth/middleware.js";
import {
  getMyNotifications,
  markAsRead,
} from "../../controllers/Notification/notification.js";
const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);
router.patch("/:id/read", authMiddleware, markAsRead);

export default router;
