import User from "../../models/User.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const getPendingRecruiters = async (req, res) => {
  try {
    const pendingRecruiters = await User.find({
      role: "recruiter",
      status: "pending",
      emailVerified: true,
    }).select("-passwordHash");

    return res.status(200).json({
      sucess: true,
      recruiter: pendingRecruiters,
    });
  } catch (error) {
    console.error("Get Pending Recruiters Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const approveRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const recruiter = await User.findOne({
      _id: recruiterId,
      role: "recruiter",
    });

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Recruiter already processed",
      });
    }

    recruiter.status = "active";
    await recruiter.save();

    await sendEmail({
      to: recruiter.email,
      subject: "Your Account Has Been Approved",
      html: `
        <h2>Congratulations and Welcome!</h2>
        <p>Your recruiter account has been approved by the admin.</p>
        <p>You can now log in and access your dashboard to recruit our talents.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Recruiter approved successfully",
    });
  } catch (error) {
    console.error("Approve Recruiter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const rejectRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;
    const recruiter = await User.findOne({
      _id: recruiterId,
      role: "recruiter",
    });

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.status !== "pending") {
      return res.status(400).json({
        success: false,
        message: "Recruiter already proccessed",
      });
    }

    recruiter.status = "blocked";
    await recruiter.save();

    await sendEmail({
      to: recruiter.email,
      subject: "Sorry! Registration Has Been Rejected",
      html: `
        <h2>Recruiter Application Rejected</h2>
        <p>We regret to inform you that your recruiter account request has been rejected.</p>
        <p>You may contact admin for more details.</p>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Recruiter rejected successfully",
    });
  } catch (error) {
    console.error("Reject Recruiter Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
