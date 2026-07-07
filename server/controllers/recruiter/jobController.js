import Job from "../../models/Job.js";
import User from "../../models/User.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import { createNotification } from "../../services/notificationService.js";
import { analyzeJob } from "../../ai/job.service.js";

export const createJob = async (req, res) => {
  try {
    const userId = req.user.id;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const { applicationDeadline } = req.body;

    if (new Date(applicationDeadline) < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Application deadline must be in future",
      });
    }

    // ===============================
    // Create Job
    // ===============================
    const job = await Job.create({
      recruiter: recruiterProfile._id,
      ...req.body,
      pendingAnalysis: true,
      jobAnalysis: {
        aiStatus: "pending",
        extractedSkills: [],
        preferredSkills: [],
        keywords: [],
      },
    });

    const populatedJob = await Job.findById(job._id).populate(
      "recruiter",
      "companyName companyLogo approvalStatus",
    );

    // ===============================
    // Notify Students
    // ===============================
    const students = await User.find({ role: "student" });

    await Promise.all(
      students.map((student) =>
        createNotification({
          recipient: student._id,
          type: "job",
          message: `New job posted: ${job.title}`,
          meta: {
            jobId: job._id,
          },
        }),
      ),
    );

    // ===============================
    // Send Response Immediately
    // ===============================
    res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: populatedJob,
    });

    // ===============================
    // Background AI Analysis
    // ===============================
    (async () => {
      try {
        const analysis = await analyzeJob({
          title: job.title,
          description: job.description,
          requirements: job.requiredSkills,
        });

        job.jobAnalysis = {
          ...analysis,
          aiStatus: "completed",
          analyzedAt: new Date(),
        };

        job.pendingAnalysis = false;

        await job.save();

        console.log(`✅ AI analysis completed for Job: ${job.title}`);
      } catch (err) {
        console.log("⚠️ Background AI failed:", err.message);

        job.jobAnalysis = {
          extractedSkills: job.requiredSkills || [],
          preferredSkills: [],
          keywords: [],
          experienceLevel: "Not Specified",
          education: "Not Specified",
          analyzedAt: null,
          aiStatus: "failed",
        };

        job.pendingAnalysis = true;

        await job.save();
      }
    })();
  } catch (error) {
    console.error("Create Job Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const jobs = await Job.find({
      recruiter: recruiterProfile._id,
    })
      .populate("recruiter", "companyName companyLogo approvalStatus")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.recruiter.toString() !== recruiterProfile._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("recruiter", "companyName companyLogo approvalStatus");

    res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: updatedJob,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.recruiter.toString() !== recruiterProfile._id.toString()) {
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
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
