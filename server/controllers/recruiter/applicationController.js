import Application from "../../models/Application.js";
import Job from "../../models/Job.js";
import { createNotification } from "../../services/notificationService.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";
import StudentProfile from "../../models/StudentProfile.js";
import { sendEmail } from "../../utils/sendEmail.js";

const formatStatusLabel = (status) =>
  status?.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());

const formatDateTime = (value) => {
  if (!value) return "To be confirmed";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "To be confirmed";

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const buildApplicationStatusEmailHtml = ({
  studentName,
  companyName,
  jobTitle,
  status,
  remarks,
}) => {
  const statusLabel = formatStatusLabel(status);
  const frontendUrl =
    process.env.CLIENT_URL || "https://pms-frontend-5y7o.onrender.com";
  const remarksText = remarks || "No additional remarks were provided.";

  return `
    <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px; color:#1f2937;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:28px 32px; color:#ffffff;">
          <h1 style="margin:0 0 8px; font-size:28px;">Application Update</h1>
          <p style="margin:0; font-size:16px; opacity:0.95;">Hello ${studentName || "there"}, your application status has been updated.</p>
        </div>
        <div style="padding:28px 32px;">
          <h2 style="margin:0 0 10px; font-size:24px; color:#111827;">${jobTitle}</h2>
          <p style="margin:0 0 16px; font-size:16px; color:#4b5563;">${companyName}</p>
          <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:14px; margin-bottom:16px;">
            <strong>Status:</strong> ${statusLabel}
          </div>
          <p style="margin:0 0 10px; line-height:1.6; color:#374151;">${remarksText}</p>
          <a href="${frontendUrl}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:bold;">
            View your application
          </a>
        </div>
      </div>
    </div>
  `;
};

const buildInterviewScheduledEmailHtml = ({
  studentName,
  companyName,
  jobTitle,
  date,
  mode,
  location,
  meetingLink,
}) => {
  const frontendUrl =
    process.env.CLIENT_URL || "https://pms-frontend-5y7o.onrender.com";
  const meetingDetails = meetingLink
    ? `<p style="margin:0 0 10px; line-height:1.6; color:#374151;"><strong>Meeting link:</strong> <a href="${meetingLink}" style="color:#2563eb;">${meetingLink}</a></p>`
    : "";

  return `
    <div style="font-family: Arial, sans-serif; background:#f6f8fb; padding:24px; color:#1f2937;">
      <div style="max-width:680px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 10px 30px rgba(0,0,0,0.08);">
        <div style="background:linear-gradient(135deg,#2563eb,#7c3aed); padding:28px 32px; color:#ffffff;">
          <h1 style="margin:0 0 8px; font-size:28px;">Interview Scheduled</h1>
          <p style="margin:0; font-size:16px; opacity:0.95;">Hello ${studentName || "there"}, your interview has been scheduled.</p>
        </div>
        <div style="padding:28px 32px;">
          <h2 style="margin:0 0 10px; font-size:24px; color:#111827;">${jobTitle}</h2>
          <p style="margin:0 0 16px; font-size:16px; color:#4b5563;">${companyName}</p>
          <div style="background:#f8fafc; border:1px solid #e5e7eb; border-radius:10px; padding:14px; margin-bottom:16px;">
            <p style="margin:0 0 8px; color:#374151;"><strong>Date:</strong> ${formatDateTime(date)}</p>
            <p style="margin:0 0 8px; color:#374151;"><strong>Mode:</strong> ${mode || "To be confirmed"}</p>
            <p style="margin:0; color:#374151;"><strong>Location:</strong> ${location || "To be confirmed"}</p>
          </div>
          ${meetingDetails}
          <a href="${frontendUrl}" style="display:inline-block; background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 18px; border-radius:999px; font-weight:bold;">
            View interview details
          </a>
        </div>
      </div>
    </div>
  `;
};

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

    await sendEmail({
      to: updatedApplication.student.email,
      subject: `Application Update: ${jobTitle}`,
      html: buildApplicationStatusEmailHtml({
        studentName: updatedApplication.student.name,
        companyName,
        jobTitle,
        status,
        remarks: remarks || "",
      }),
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

    await sendEmail({
      to: updatedApplication.student.email,
      subject: `Interview Scheduled: ${jobTitle}`,
      html: buildInterviewScheduledEmailHtml({
        studentName: updatedApplication.student.name,
        companyName,
        jobTitle,
        date,
        mode,
        location,
        meetingLink,
      }),
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
