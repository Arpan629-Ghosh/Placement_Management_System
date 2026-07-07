import cloudinary from "../../config/cloudinary.js";
import StudentProfile from "../../models/StudentProfile.js";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import fs from "fs";
import sharp from "sharp";
import path from "path";
import supabase from "../../config/supabase.js";
import { extractResumeText } from "../../ai/extractResumeText.js";
import { analyzeResume } from "../../ai/resume.service.js";
import { recommendJobs } from "../../recommendation/recommendation.service.js";

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
      .populate("recruiter", "companyName companyLogo approvalStatus")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const recentJobs = jobs.map((job) => ({
      _id: job._id,
      title: job.title,
      location: job.location,
      salaryRange: job.salaryRange,
      jobType: job.jobType,
      applicationDeadline: job.applicationDeadline,

      companyName: job.recruiter?.companyName || "Unknown Company",

      companyLogo: job.recruiter?.companyLogo?.url || null,
    }));

    // Recent Applications
    const recentApplications = await Application.find({
      student: userId,
    })
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "companyName companyLogo",
        },
      })
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

      companyName: application.job?.recruiter?.companyName || "Unknown Company",

      companyLogo: application.job?.recruiter?.companyLogo?.url || null,
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

    const studentProfile = await StudentProfile.findOne({
      user: userId,
    });

    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    // ==========================
    // Delete old resume
    // ==========================
    if (studentProfile.resume?.filename) {
      await supabase.storage
        .from("resumes")
        .remove([studentProfile.resume.filename]);
    }

    const { data: buckets, error: bucketError } =
      await supabase.storage.listBuckets();

    // ==========================
    // Upload new PDF
    // ==========================
    const fileBuffer = req.file.buffer;

    // ==========================
    // Extract Resume Text
    // ==========================

    const resumeText = await extractResumeText(fileBuffer);

    const fileName = `${userId}_${Date.now()}.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(fileName, fileBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      return res.status(500).json({
        success: false,
        uploadError,
      });
    }

    // ==========================
    // AI Resume Analysis
    // ==========================

    const analysis = await analyzeResume(resumeText);

    // ==========================
    // Get Public URL
    // ==========================
    const { data } = supabase.storage.from("resumes").getPublicUrl(fileName);

    // ==========================
    // Save in MongoDB
    // ==========================
    studentProfile.resume = {
      url: data.publicUrl,
      filename: fileName,
    };

    studentProfile.resumeAnalysis = {
      ...analysis,
      analyzedAt: new Date(),
    };

    await studentProfile.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: studentProfile.resume,

      analysis: studentProfile.resumeAnalysis,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "Server Error",
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

export const getAvailaibleJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      jobType = "",
      location = "",
      sort = "latest",
    } = req.query;

    const query = {
      status: "open",
      visibility: "public",
      applicationDeadline: {
        $gt: new Date(),
      },
    };

    // Search
    if (search.trim()) {
      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          requiredSkills: {
            $elemMatch: {
              $regex: search,
              $options: "i",
            },
          },
        },
      ];
    }

    // Job Type Filter
    if (jobType) {
      query.jobType = jobType;
    }

    // Location Filter
    if (location.trim()) {
      query.location = {
        $regex: location,
        $options: "i",
      };
    }

    // Sorting
    let sortOption = {};

    switch (sort) {
      case "oldest":
        sortOption = { createdAt: 1 };
        break;

      case "salary_high":
        sortOption = {
          "salaryRange.max": -1,
        };
        break;

      case "salary_low":
        sortOption = {
          "salaryRange.min": 1,
        };
        break;

      case "deadline":
        sortOption = {
          applicationDeadline: 1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [jobs, total] = await Promise.all([
      Job.find(query)
        .populate(
          "recruiter",
          `
            companyName
            companyLogo
            companyWebsite
            designation
          `,
        )
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit))
        .lean(),

      Job.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,

      jobs,

      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalJobs: total,
        limit: Number(limit),

        hasNextPage: Number(page) < Math.ceil(total / limit),

        hasPreviousPage: Number(page) > 1,
      },
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

    if (job.status !== "open") {
      return res.status(400).json({
        success: false,
        message: "This job is closed",
      });
    }

    if (job.visibility !== "public") {
      return res.status(400).json({
        success: false,
        message: "Job is not available",
      });
    }

    if (job.applicationDeadline < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Application deadline has passed",
      });
    }

    const studentProfile = await StudentProfile.findOne({
      user: userId,
    });

    if (!studentProfile) {
      return res.status(404).json({
        success: false,
        message: "Student profile not found",
      });
    }

    if (!studentProfile.resume?.url) {
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

    // Optional Eligibility Check
    if (
      job.eligibilityCriteria?.minCGPA &&
      studentProfile.cgpa &&
      studentProfile.cgpa < job.eligibilityCriteria.minCGPA
    ) {
      return res.status(400).json({
        success: false,
        message: "You are not eligible for this job",
      });
    }

    const application = await Application.create({
      job: jobId,
      student: userId,
      resumeSnapshot: studentProfile.resume,
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [applications, totalApplications] = await Promise.all([
      Application.find({
        student: req.user.id,
      })
        .populate({
          path: "job",
          select: `
            title
            location
            jobType
            salaryRange
            applicationDeadline
            recruiter
          `,
          populate: {
            path: "recruiter",
            select: `
              companyName
              companyLogo
            `,
          },
        })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Application.countDocuments({
        student: req.user.id,
      }),
    ]);

    const totalPages = Math.ceil(totalApplications / limit);

    res.status(200).json({
      success: true,

      applications,

      pagination: {
        currentPage: page,
        totalPages,
        totalApplications,
        limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
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
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: `
            companyName
            companyLogo
            companyWebsite
            designation
            contactNumber
          `,
        },
      })
      .populate(
        "student",
        `
          name
          email
        `,
      );

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

export const getJobDetails = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate(
      "recruiter",
      `
        companyName
        companyLogo
        companyWebsite
        designation
        contactNumber
      `,
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getApplicationStatus = async (req, res) => {
  try {
    const { jobId } = req.params;

    const application = await Application.findOne({
      job: jobId,
      student: req.user.id,
    });

    res.status(200).json({
      success: true,
      applied: !!application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    const student = await StudentProfile.findOne({
      user: userId,
    });

    if (!student?.resumeAnalysis) {
      return res.status(400).json({
        success: false,
        message: "Upload your resume first.",
      });
    }

    const jobs = await Job.find({
      status: "open",
    }).populate(
      "recruiter",
      `
        companyName
        companyLogo
        companyWebsite
        designation
      `,
    );

    const recommendations = recommendJobs(student.resumeAnalysis, jobs);

    res.json({
      success: true,
      recommendations,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
