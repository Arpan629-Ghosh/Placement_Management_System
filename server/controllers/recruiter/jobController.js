import Job from "../../models/Job.js";
import User from "../../models/User.js";
import { createNotification } from "../../services/notificationService.js";

export const createJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const { applicationDeadline } = req.body;

    // Deadline validation
    if (new Date(applicationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Application deadline must be in future",
      });
    }

    const job = await Job.create({
      recruiter: recruiterId,
      ...req.body,
    });

    // ===============================
    // 🔔 NOTIFICATION TRIGGER
    // ===============================
    const students = await User.find({ role: "student" });

    for (const student of students) {
      await createNotification({
        recipient: student._id,
        type: "job",
        message: `New job posted: ${job.title}`,
        meta: { jobId: job._id },
      });
    }

    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const jobs = await Job.find({ recruiter: recruiterId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ownership check 🔥
    if (job.recruiter.toString() !== recruiterId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { $set: req.body },
      { new: true, runValidators: true },
    );

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Ownership check 🔥
    if (job.recruiter.toString() !== recruiterId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Job.findByIdAndDelete(jobId);

    res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
