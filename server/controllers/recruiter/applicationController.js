import Application from "../../models/Application.js";
import Job from "../../models/Job.js";
import { createNotification } from "../../services/notificationService.js";

export const getApplicationsByJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;

    const job = await Job.findOne({
      _id: jobId,
      recruiter: recruiterId,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "Job not found",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("student", "name email")
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
    const recruiterId = req.user.id;
    const { applicationId } = req.params;
    const { status } = req.body;

    const application =
      await Application.findById(applicationId).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application Not found",
      });
    }

    if (application.job.recruiter.toString() !== recruiterId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    application.status = status;
    await application.save();

    await createNotification({
      recipient: application.student,
      type: "application",
      message: `Your application status changed to ${status}`,
      meta: { applicationId: application._id },
    });

    res.status(200).json({
      success: true,
      message: "Application status updated",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const scheduleInterview = async (req, res) => {
  try {
    const recruiterId = req.user.id;
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

    if (application.job.recruiter.toString() !== recruiterId) {
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

    await application.save();

    await createNotification({
      recipient: application.student,
      type: "interview",
      message: `Interview scheduled on ${date}`,
      meta: { applicationId: application._id },
    });

    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      data: application,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
