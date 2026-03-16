import cloudinary from "../../config/cloudinary.js";
import StudentProfile from "../../models/StudentProfile.js";
import Job from "../../models/Job.js";
import Application from "../../models/Application.js";

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

    const updateProfile = await StudentProfile.findOneAndUpdate(
      { user: userId },
      { $set: req.body },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
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

    if (studentProfile.resume && studentProfile.resume.public_id) {
      await cloudinary.uploader.destroy(profile.resume.public_id, {
        resource_type: "raw",
      });
    }

    //upload to cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "pms/resumes",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(req.file.buffer);
    });

    // Save new resume in database
    studentProfile.resume = {
      url: result.secure_url,
      public_id: result.public_id,
    };

    await studentProfile.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: studentProfile.resume,
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
    const jobs = await Job.find({
      status: "open",
      visibility: "public",
      applicationDeadline: { $gt: new Date() },
    }).populate("recruiter", "companyName");

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
