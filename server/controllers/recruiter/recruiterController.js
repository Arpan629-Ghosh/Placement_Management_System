import RecruiterProfile from "../../models/RecruiterProfile.js";
import cloudinary from "../../config/cloudinary.js";

import Job from "../../models/Job.js";
import Application from "../../models/Application.js";

export const getRecruiterDashboard = async (req, res) => {
  try {
    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    const recruiterJobs = await Job.find({
      recruiter: recruiterProfile._id,
    }).select("_id title createdAt");

    const jobIds = recruiterJobs.map((job) => job._id);

    const [
      totalJobs,
      totalApplications,
      underReview,
      shortlisted,
      interviewsScheduled,
      selected,
      rejected,
      recentApplications,
    ] = await Promise.all([
      Job.countDocuments({ recruiter: recruiterProfile._id }),

      Application.countDocuments({
        job: { $in: jobIds },
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "under_review",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "shortlisted",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "interview_scheduled",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "selected",
      }),

      Application.countDocuments({
        job: { $in: jobIds },
        status: "rejected",
      }),

      Application.find({
        job: { $in: jobIds },
      })
        .populate("student", "name email")
        .populate("job", "title")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);
    const recentJobs = await Job.find({
      recruiter: recruiterProfile._id,
    })
      .sort({ createdAt: -1 })
      .limit(5).select(`
    title
    status
    createdAt
  `);

    res.status(200).json({
      success: true,

      stats: {
        totalJobs,
        totalApplications,
        underReview,
        shortlisted,
        interviewsScheduled,
        selected,
        rejected,
      },

      recentApplications,
      recentJobs,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =========================================
   CREATE PROFILE
========================================= */
export const createRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const existingProfile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Recruiter profile already exists",
      });
    }

    let companyLogo = {};

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "pms/recruiter-logos",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      companyLogo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const profile = await RecruiterProfile.create({
      user: userId,
      ...req.body,
      companyLogo,
    });

    await profile.populate("user", "name email role");

    res.status(201).json({
      success: true,
      message: "Recruiter profile created successfully",
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

/* =========================================
   GET PROFILE
========================================= */
export const getRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    }).populate("user", "name email role");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    res.status(200).json({
      success: true,
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

/* =========================================
   UPDATE PROFILE
========================================= */
export const updateRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    const updateData = {
      ...req.body,
    };

    if (req.file) {
      // delete old logo
      if (profile.companyLogo?.public_id) {
        await cloudinary.uploader.destroy(profile.companyLogo.public_id);
      }

      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "pms/recruiter-logos",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(req.file.buffer);
      });

      updateData.companyLogo = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const updatedProfile = await RecruiterProfile.findOneAndUpdate(
      { user: userId },
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    ).populate("user", "name email role");

    res.status(200).json({
      success: true,
      message: "Recruiter profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* =========================================
   DELETE PROFILE
========================================= */
export const deleteRecruiterProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const profile = await RecruiterProfile.findOne({
      user: userId,
    });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    if (profile.companyLogo?.public_id) {
      await cloudinary.uploader.destroy(profile.companyLogo.public_id);
    }

    await RecruiterProfile.findOneAndDelete({
      user: userId,
    });

    res.status(200).json({
      success: true,
      message: "Recruiter profile deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
