import express from "express";
import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isStudent } from "../../middlewares/role/middleware.js";
import {
  applyForJob,
  createStudentProfile,
  deleteStudentProfile,
  getApplicationDetails,
  getAvailaibleJobs,
  getMyApplication,
  getStudentProfile,
  updateStudentProfile,
  uploadResume,
} from "../../controllers/student/studentController.js";
import upload from "../../middlewares/upload/multer.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, isStudent, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Student Dashboard",
    user: req.user,
  });
});

/* ===============================
   Student Profile CRUD
================================= */

// CREATE Profile
router.post("/profile", authMiddleware, isStudent, createStudentProfile);

// GET My Profile
router.get("/profile", authMiddleware, isStudent, getStudentProfile);

// UPDATE My Profile
router.put("/profile", authMiddleware, isStudent, updateStudentProfile);

// DELETE My Profile (optional but clean)
router.delete("/profile", authMiddleware, isStudent, deleteStudentProfile);

router.post(
  "/upload-resume",
  authMiddleware,
  isStudent,
  upload.single("resume"),
  uploadResume,
);

router.get("/jobs", authMiddleware, isStudent, getAvailaibleJobs);

router.post("/apply/:jobId", authMiddleware, isStudent, applyForJob);

router.get("/applications", authMiddleware, isStudent, getMyApplication);

router.get(
  "/applications/:applicationId",
  authMiddleware,
  isStudent,
  getApplicationDetails,
);
export default router;
