import express from "express";
import { authMiddleware } from "../../middlewares/auth/middleware.js";
import { isRecruiter } from "../../middlewares/role/middleware.js";
import imageUpload from "../../middlewares/upload/imageUpload.js";
import {
  createRecruiterProfile,
  deleteRecruiterProfile,
  getRecruiterDashboard,
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
  getAllApplications,
  getAllInterviews,
  getApplicationDetailsForRecruiter,
  getApplicationsByJob,
  scheduleInterview,
  updateApplicationStatus,
} from "../../controllers/recruiter/applicationController.js";

const router = express.Router();

// Recruiter Dashboard
router.get(
  "/dashboard",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getRecruiterDashboard,
);

router.post(
  "/profile",
  authMiddleware,
  isRecruiter,
  imageUpload.single("companyLogo"),
  createRecruiterProfile,
);
router.get("/profile", authMiddleware, isRecruiter, getRecruiterProfile);
router.put(
  "/profile",
  authMiddleware,
  isRecruiter,
  imageUpload.single("companyLogo"),
  updateRecruiterProfile,
);
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
router.delete(
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

router.get(
  "/applications/:applicationId",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getApplicationDetailsForRecruiter,
);

router.get(
  "/applications",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getAllApplications,
);

router.get(
  "/interviews",
  authMiddleware,
  isRecruiter,
  isRecruiterApproved,
  getAllInterviews,
);
export default router;
