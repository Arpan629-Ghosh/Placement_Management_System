import Application from "../../models/Application.js";
import Job from "../../models/Job.js";
import { createNotification } from "../../services/notificationService.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import StudentProfile from "../../models/StudentProfile.js";

export const getAllApplications = async (req, res) => {
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
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    const applications = await Application.find({
      job: { $in: jobIds },
    })
      .populate({
        path: "student",
        select: "name email",
      })
      .populate({
        path: "job",
        select: `
          title
          location
          jobType
        `,
      })
      .sort({ createdAt: -1 });

    const studentIds = applications.map(
      (application) => application.student?._id,
    );

    const studentProfiles = await StudentProfile.find({
      user: { $in: studentIds },
    }).select(`
      user
      profilePicture
      yearOfPassing
    `);

    const profileMap = {};

    studentProfiles.forEach((profile) => {
      profileMap[profile.user.toString()] = {
        profilePicture: profile.profilePicture,
        yearOfPassing: profile.yearOfPassing,
      };
    });

    const formattedApplications = applications.map((application) => ({
      ...application.toObject(),

      student: {
        ...application.student.toObject(),

        profilePicture: profileMap[application.student._id.toString()] || null,

        yearOfPassing:
          profileMap[application.student._id.toString()]?.yearOfPassing || null,
      },
    }));

    res.status(200).json({
      success: true,
      total: formattedApplications.length,
      applications: formattedApplications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    const job = await Job.findOne({
      _id: jobId,
      recruiter: recruiterProfile._id,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Job not found",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("student", "name email profilePicture")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateApplicationStatus = async (req, res) => {
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

    const { applicationId } = req.params;
    const { status, remarks } = req.body;

    const allowedStatuses = [
      "applied",
      "under_review",
      "shortlisted",
      "interview_scheduled",
      "selected",
      "rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid application status",
      });
    }

    const application = await Application.findById(applicationId).populate({
  path: "job",
  populate: {
    path: "recruiter",
    select: "companyName",
  },
});

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
  application.job.recruiter._id.toString() !==
  recruiterProfile._id.toString()
) {
  return res.status(403).json({
    success: false,
    message: "Unauthorized",
  });
}
    if (status === "selected") {
      if (!application.interview?.scheduled || !application.interview?.date) {
        return res.status(400).json({
          success: false,
          message: "Candidate cannot be selected without a scheduled interview",
        });
      }

      const interviewDate = new Date(application.interview.date);

      if (interviewDate > new Date()) {
        return res.status(400).json({
          success: false,
          message:
            "Interview has not occurred yet. Candidate cannot be selected.",
        });
      }
    }

    application.status = status;

    application.statusHistory.push({
      status,
      remarks: remarks || "",
      updatedAt: new Date(),
    });

    await application.save();

    const updatedApplication = await Application.findById(application._id)
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
      .populate("student", "name email");

    const studentProfile = await StudentProfile.findOne({
      user: updatedApplication.student._id,
    }).select(`
      profilePicture
      contactNumber
      department
      skills
      yearOfPassing
      certifications
      workExperience
      availabilityStatus
    `);

    const responseData = {
      ...updatedApplication.toObject(),
      student: {
        ...updatedApplication.student.toObject(),
        ...(studentProfile ? studentProfile.toObject() : {}),
      },
    };


const companyName =
  updatedApplication.job?.recruiter?.companyName || "Company";

const jobTitle = updatedApplication.job?.title || "Position";

let notificationMessage = "";

switch (status) {
  case "under_review":
    notificationMessage = `Your application for ${jobTitle} at ${companyName} is under review.`;
    break;

  case "shortlisted":
    notificationMessage = `You have been shortlisted for ${jobTitle} at ${companyName}.`;
    break;

  case "interview_scheduled":
    notificationMessage = `${companyName} scheduled an interview for ${jobTitle}.`;
    break;

  case "selected":
    notificationMessage = `Congratulations! ${companyName} has selected you for ${jobTitle}.`;
    break;

  case "rejected":
    notificationMessage = `Your application for ${jobTitle} at ${companyName} was not selected.`;
    break;

  default:
    notificationMessage = `Your application status for ${jobTitle} at ${companyName} changed to ${status.replaceAll("_", " ")}.`;
}

    await createNotification({
  recipient: application.student,
  type: "application",
  message: notificationMessage,
  meta: {
    applicationId: application._id,
    status,
  },
});

    return res.status(200).json({
      success: true,
      message: "Application status updated",
      data: responseData,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const scheduleInterview = async (req, res) => {
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

    const { applicationId } = req.params;
    const { date, mode, location, meetingLink } = req.body;

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.job.recruiter.toString() !== recruiterProfile._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (application.status !== "shortlisted") {
      return res.status(400).json({
        success: false,
        message: "Only shortlisted candidates can be scheduled",
      });
    }

    application.interview = {
      scheduled: true,
      date,
      mode,
      location,
      meetingLink,
    };

    application.status = "interview_scheduled";

    application.statusHistory.push({
      status: "interview_scheduled",
      remarks: "Interview Scheduled",
      updatedAt: new Date(),
    });

    await application.save();

    const updatedApplication = await Application.findById(application._id)
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

    const studentProfile = await StudentProfile.findOne({
      user: updatedApplication.student._id,
    }).select(`
      profilePicture
      contactNumber
      department
      skills
      yearOfPassing
      resume
    `);

    const applicationObject = updatedApplication.toObject();

    applicationObject.student = {
      ...applicationObject.student,
      ...(studentProfile ? studentProfile.toObject() : {}),
    };

    const companyName =
  updatedApplication.job?.recruiter?.companyName || "Company";

const jobTitle = updatedApplication.job?.title || "Position";

const formattedDate = new Date(date).toLocaleString("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});

await createNotification({
  recipient: application.student,
  type: "interview",
  message: `${companyName} scheduled your interview for ${jobTitle} on ${formattedDate}`,
  meta: {
    applicationId: application._id,
    status: "interview_scheduled",
    companyName,
    jobTitle,
    interviewDate: date,
    interviewMode: mode,
  },
});

    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      data: applicationObject,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllInterviews = async (req, res) => {
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
    }).select("_id");

    const jobIds = jobs.map((job) => job._id);

    const interviews = await Application.find({
      job: { $in: jobIds },
      "interview.scheduled": true,
    })
      .populate("student", "name email")
      .populate("job", "title location")
      .sort({
        "interview.date": 1,
      });

    const studentIds = interviews.map((interview) => interview.student?._id);

    const studentProfiles = await StudentProfile.find({
      user: { $in: studentIds },
    }).select(`
      user
      profilePicture
      contactNumber
      department
      yearOfPassing
    `);

    const profileMap = {};

    studentProfiles.forEach((profile) => {
      profileMap[profile.user.toString()] = profile;
    });

    const formattedInterviews = interviews.map((interview) => {
      const profile = profileMap[interview.student?._id?.toString()] || null;

      return {
        ...interview.toObject(),

        student: {
          ...interview.student.toObject(),

          profilePicture: profile?.profilePicture || null,
          contactNumber: profile?.contactNumber || "",
          department: profile?.department || "",
          yearOfPassing: profile?.yearOfPassing || "",
        },
      };
    });

    res.status(200).json({
      success: true,
      total: formattedInterviews.length,
      interviews: formattedInterviews,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getApplicationDetailsForRecruiter = async (req, res) => {
  try {
    const { applicationId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

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
      .populate({
        path: "student",
        select: `
          name
          email
        `,
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (
      application.job.recruiter._id.toString() !==
      recruiterProfile._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const studentProfile = await StudentProfile.findOne({
      user: application.student._id,
    }).select(`
      profilePicture
      contactNumber
      department
      cgpa
      yearOfPassing
      skills
      collegeName
      github
      linkedin
      portfolio
      bio
      resume
    `);

    const formattedApplication = {
      ...application.toObject(),

      student: {
        ...application.student.toObject(),

        profilePicture: studentProfile?.profilePicture || null,
        contactNumber: studentProfile?.contactNumber || "",
        department: studentProfile?.department || "",
        cgpa: studentProfile?.cgpa || "",
        passingYear: studentProfile?.yearOfPassing || "",
        skills: studentProfile?.skills || [],
        collegeName: studentProfile?.collegeName || "",
        github: studentProfile?.github || "",
        linkedin: studentProfile?.linkedin || "",
        portfolio: studentProfile?.portfolio || "",
        bio: studentProfile?.bio || "",
        resume: studentProfile?.resume || null,
      },
    };

    res.status(200).json({
      success: true,
      application: formattedApplication,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
