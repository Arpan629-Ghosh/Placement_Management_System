import cloudinary from "../../config/cloudinary.js";
import StudentProfile from "../../models/StudentProfile.js";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import fs from "fs";
import sharp from "sharp";

const isAllowedCloudinaryResumeUrl = (value) => {
  try {
    const parsedUrl = new URL(value);

    return (
      parsedUrl.hostname === "res.cloudinary.com" &&
      parsedUrl.pathname.includes("/raw/upload/") &&
      parsedUrl.pathname.endsWith(".pdf")
    );
  } catch {
    return false;
  }
};

const getResumeCandidateIds = (resumeUrl, resumePublicId) => {
  const candidates = new Set();

  if (resumePublicId) {
    candidates.add(resumePublicId);
    candidates.add(resumePublicId.replace(/\.pdf$/i, ""));
    candidates.add(`${resumePublicId}.pdf`);
  }

  try {
    const parsedUrl = new URL(resumeUrl);
    const lastPathSegment = parsedUrl.pathname.split("/").filter(Boolean).pop();

    if (lastPathSegment) {
      candidates.add(lastPathSegment);
      candidates.add(lastPathSegment.replace(/\.pdf$/i, ""));
      candidates.add(`${lastPathSegment}.pdf`);
    }
  } catch {
    // Ignore malformed URL inputs; validation happens earlier.
  }

  return [...candidates].filter(Boolean);
};

const getResumeVersion = (resumeUrl, resumeVersion) => {
  if (resumeVersion) {
    return resumeVersion;
  }

  try {
    const parsedUrl = new URL(resumeUrl);
    const versionMatch = parsedUrl.pathname.match(/\/v(\d+)\//);

    if (versionMatch) {
      return Number(versionMatch[1]);
    }
  } catch {
    // Ignore malformed URL inputs; validation happens earlier.
  }

  return undefined;
};

export const proxyResumePreview = async (req, res) => {
  try {
    const resumeUrl = req.query.url;
    const resumePublicId = req.query.publicId;
    const resumeVersion = getResumeVersion(req.query.url, req.query.version);

    if (!resumeUrl || !isAllowedCloudinaryResumeUrl(resumeUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume URL",
      });
    }

    if (!resumePublicId) {
      return res.status(400).json({
        success: false,
        message: "Missing resume public ID",
      });
    }

    const candidateIds = getResumeCandidateIds(resumeUrl, resumePublicId);

    for (const candidateId of candidateIds) {
      const candidateUrl = cloudinary.url(candidateId, {
        resource_type: "raw",
        type: "upload",
        format: "pdf",
        secure: true,
        sign_url: true,
        version: resumeVersion,
      });

      const response = await fetch(candidateUrl);

      if (!response.ok) {
        continue;
      }

      const buffer = Buffer.from(await response.arrayBuffer());

      res.setHeader(
        "Content-Type",
        response.headers.get("content-type") || "application/pdf",
      );
      res.setHeader("Content-Length", buffer.length);

      if (req.query.download === "1") {
        res.setHeader("Content-Disposition", "attachment; filename=resume.pdf");
      } else {
        res.setHeader("Content-Disposition", "inline; filename=resume.pdf");
      }

      return res.status(200).send(buffer);
    }

    return res.status(404).json({
      success: false,
      message: "Unable to load resume",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Student Profile
    const profile = await StudentProfile.findOne({
      user: userId,
    }).populate("user", "name email");

    // Recent Jobs
    const jobs = await Job.find({
      status: "open",
      visibility: "public",
      applicationDeadline: { $gt: new Date() },
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // Recruiter Info
    const recruiterIds = jobs.map((job) => job.recruiter);

    const recruiterProfiles = await RecruiterProfile.find({
      user: { $in: recruiterIds },
    }).lean();

    const recruiterMap = {};

    recruiterProfiles.forEach((profile) => {
      recruiterMap[profile.user.toString()] = profile;
    });

    const recentJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.title,
      location: job.location,
      salaryRange: job.salaryRange,
      jobType: job.jobType,
      applicationDeadline: job.applicationDeadline,

      companyName:
        recruiterMap[job.recruiter.toString()]?.companyName ||
        "Unknown Company",

      companyLogo:
        recruiterMap[job.recruiter.toString()]?.companyLogo?.url || null,
    }));

    // Recent Applications
    const recentApplications = await Application.find({
      student: userId,
    })
      .populate("job")
      .sort({ createdAt: -1 })
      .limit(5);

    const applicationRecruiterIds = recentApplications
      .map((application) => application.job?.recruiter)
      .filter(Boolean);

    const applicationRecruiterProfiles = await RecruiterProfile.find({
      user: { $in: applicationRecruiterIds },
    }).lean();

    const applicationRecruiterMap = {};

    applicationRecruiterProfiles.forEach((profile) => {
      applicationRecruiterMap[profile.user.toString()] = profile;
    });

    const formattedApplications = recentApplications.map((application) => ({
      _id: application._id,
      status: application.status,
      appliedAt: application.appliedAt,
      title: application.job?.title || "Untitled Job",
      companyName:
        applicationRecruiterMap[application.job?.recruiter?.toString()]
          ?.companyName || "Unknown Company",
      companyLogo:
        applicationRecruiterMap[application.job?.recruiter?.toString()]
          ?.companyLogo?.url || null,
    }));

    // Stats
    const totalApplications = await Application.countDocuments({
      student: userId,
    });

    const underReview = await Application.countDocuments({
      student: userId,
      status: "under_review",
    });

    const shortlisted = await Application.countDocuments({
      student: userId,
      status: "shortlisted",
    });

    const interviews = await Application.countDocuments({
      student: userId,
      status: "interview_scheduled",
    });

    res.status(200).json({
      success: true,

      student: {
        name: profile?.user?.name || "",
        email: profile?.user?.email || "",
        profilePicture: profile?.profilePicture?.url || null,
        department: profile?.department || "",
      },

      stats: {
        totalApplications,
        underReview,
        shortlisted,
        interviews,
      },

      recentJobs,

      recentApplications: formattedApplications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
export const createStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await StudentProfile.findOne({ user: userId });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    const profile = await StudentProfile.create({
      user: userId,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await StudentProfile.findOne({
      user: userId,
    }).populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    console.error(error);
    res.status(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      },
    ).populate("user", "name email role");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteStudentProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const deletedProfile = await StudentProfile.findOneAndDelete({
      user: userId,
    });

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    const studentProfile = await StudentProfile.findOne({ user: userId });

    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // 🗑 Delete old resume from Cloudinary
    if (studentProfile.resume?.public_id) {
      await cloudinary.uploader.destroy(studentProfile.resume.public_id, {
        resource_type: "raw",
      });
    }

    // ☁️ Upload new resume
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",
      folder: "pms/resumes",
      format: "pdf",
    });

    // 🧹 Delete local file (VERY IMPORTANT)
    fs.unlinkSync(req.file.path);

    // 💾 Save in DB
    studentProfile.resume = {
      url: result.secure_url,
      public_id: result.public_id,
      format: result.format || "pdf",
      version: result.version,
    };

    await studentProfile.save();

    console.log(req.file);

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: studentProfile.resume,
    });
  } catch (error) {
    console.error(error);

    // cleanup if error occurs
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const uploadProfilePicture = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Profile picture file is required",
      });
    }

    const studentProfile = await StudentProfile.findOne({ user: userId });

    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // Delete old profile picture if exists
    if (
      studentProfile.profilePicture &&
      studentProfile.profilePicture.public_id
    ) {
      await cloudinary.uploader.destroy(
        studentProfile.profilePicture.public_id,
      );
    }

    const optimizedProfilePicture = await sharp(req.file.buffer)
      .rotate()
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ lossless: true, effort: 6 })
      .toBuffer();

    // Upload new profile picture to cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "pms/profile-pictures",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(optimizedProfilePicture);
    });

    // Save new profile picture in database
    studentProfile.profilePicture = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await studentProfile.save();

    res.status(200).json({
      success: true,
      message: "Profile picture uploaded successfully",
      profilePicture: studentProfile.profilePicture,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// export const getAvailaibleJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find({
//       status: "open",
//       visibility: "public",
//       applicationDeadline: { $gt: new Date() },
//     }).populate("recruiter", "companyName");

//     res.status(200).json({
//       success: true,
//       total: jobs.length,
//       jobs,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

export const getAvailaibleJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      status: "open",
      visibility: "public",
      applicationDeadline: { $gt: new Date() },
    }).lean();

    const recruiterIds = jobs.map((job) => job.recruiter);

    const recruiterProfiles = await RecruiterProfile.find({
      user: { $in: recruiterIds },
    }).lean();

    const profileMap = {};

    recruiterProfiles.forEach((profile) => {
      profileMap[profile.user.toString()] = profile;
    });

    const formattedJobs = jobs.map((job) => ({
      ...job,
      companyName:
        profileMap[job.recruiter.toString()]?.companyName || "Unknown Company",

      companyLogo:
        profileMap[job.recruiter.toString()]?.companyLogo?.url || null,
    }));

    res.status(200).json({
      success: true,
      total: formattedJobs.length,
      jobs: formattedJobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.applicationDeadline < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Application Deadline has passed",
      });
    }

    const profile = await StudentProfile.findOne({ user: userId });

    if (!profile || !profile.resume) {
      return res.status(400).json({
        success: false,
        message: "Please upload resume before applying",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      student: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      student: userId,
      resumeSnapshot: profile.resume,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMyApplication = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await Application.find({
      student: userId,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getApplicationDetails = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const application = await Application.findById(applicationId)
      .populate("job")
      .populate("student", "name email");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
