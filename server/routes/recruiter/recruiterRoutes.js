import express from "express";
import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isRecruiter } from "../../middlewares/role/middleware.js";
import {
  createRecruiterProfile,
  deleteRecruiterProfile,
  getRecruiterProfile,
  updateRecruiterProfile,
} from "../../controllers/recruiter/recruiterController.js";
import { isRecruiterApproved } from "../../middlewares/approve-recruiter/isRecruiterApproved.js";
import {
  createJob,
  deleteJob,
  getRecruiterJobs,
  updateJob,
} from "../../controllers/recruiter/jobController.js";
import {
  getApplicationsByJob,
  scheduleInterview,
  updateApplicationStatus,
} from "../../controllers/recruiter/applicationController.js";

const router = express.Router();

// Recruiter Dashboard
router.get("/dashboard", authMiddleware, isRecruiter, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Recruiter Dashboard",
    user: req.user,
  });
});

router.post("/profile", authMiddleware, isRecruiter, createRecruiterProfile);
router.get("/profile", authMiddleware, isRecruiter, getRecruiterProfile);
router.put("/profile", authMiddleware, isRecruiter, updateRecruiterProfile);
router.delete("/profile", authMiddleware, isRecruiter, deleteRecruiterProfile);
router.post(
  "/job",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  createJob,
);
router.get(
  "/job",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getRecruiterJobs,
);
router.put(
  "/job/:jobId",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  updateJob,
);
router.post(
  "/job/:jobId",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  deleteJob,
);

router.get(
  "/jobs/:jobId/applications",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getApplicationsByJob,
);

router.patch(
  "/applications/:applicationId/status",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  updateApplicationStatus,
);

router.post(
  "/applications/:applicationId/interview",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  scheduleInterview,
);
export default router;
