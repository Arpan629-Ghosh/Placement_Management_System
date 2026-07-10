import Job from "../../models/Job.js";
import User from "../../models/User.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import { createNotification } from "../../services/notificationService.js";
import { analyzeJob } from "../../ai/job.service.js";
import { sendEmail } from "../../utils/sendEmail.js";

const formatSalary = (salaryRange) => {
  if (!salaryRange) return "Compensation details available upon request";

  const min = salaryRange.min;
  const max = salaryRange.max;

  if (min && max) return `$${min} - $${max}`;
  if (min) return `From $${min}`;
  if (max) return `Up to $${max}`;

  return "Compensation details available upon request";
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const buildJobPostingEmailHtml = (job) => {
  const recruiter = job.recruiter || {};
  const companyName = recruiter.companyName || job.companyName || "Our Team";
  const location = job.location || "Remote";
  const salary = formatSalary(job.salaryRange);
  const deadline = formatDate(job.applicationDeadline);
  const skills =
    (job.requiredSkills || []).slice(0, 6).join(" • ") ||
    "Details available in the portal";
  const frontendUrl =
    process.env.CLIENT_URL || "https://pms-frontend-5y7o.onrender.com";

  return `
    <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px; color:#1f2937;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:28px 32px; color:#ffffff;">
          <h1 style="margin:0 0 8px; font-size:28px;">New Job Opportunity</h1>
          <p style="margin:0; font-size:16px; opacity:0.95;">A fresh opportunity has just been posted for talented students.</p>
        </div>
        <div style="padding:28px 32px;">
          <h2 style="margin:0 0 10px; font-size:24px; color:#111827;">${job.title}</h2>
          <p style="margin:0 0 16px; font-size:16px; color:#4b5563;">${companyName}</p>

          <div style="display:grid; gap:10px; margin:16px 0 20px;">
            <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px;">
              <strong>Location:</strong> ${location}
            </div>
            <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px;">
              <strong>Type:</strong> ${job.jobType?.replace(/_/g, " ") || "Not specified"}
            </div>
            <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px;">
              <strong>Salary:</strong> ${salary}
            </div>
            <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:12px 14px;">
              <strong>Deadline:</strong> ${deadline}
            </div>
          </div>

          <h3 style="margin:0 0 8px; font-size:18px; color:#111827;">About the role</h3>
          <p style="margin:0 0 16px; line-height:1.6; color:#374151;">${job.description}</p>

          <h3 style="margin:0 0 8px; font-size:18px; color:#111827;">Required skills</h3>
          <p style="margin:0 0 20px; line-height:1.6; color:#374151;">${skills}</p>

          <a href="${frontendUrl}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:bold;">
            Explore this opportunity
          </a>
        </div>
      </div>
    </div>
  `;
};

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

    await Promise.all(
      students.map((student) =>
        sendEmail({
          to: student.email,
          subject: `New Opportunity: ${job.title} at ${populatedJob.recruiter?.companyName || job.companyName}`,
          html: buildJobPostingEmailHtml(populatedJob),
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
