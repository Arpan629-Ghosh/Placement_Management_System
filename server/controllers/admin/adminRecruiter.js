import RecruiterProfile from "../../models/RecruiterProfile.js";
import User from "../../models/User.js";
import { sendEmail } from "../../utils/sendEmail.js";

// ✅ GET Pending Recruiters
export const getPendingRecruiters = async (req, res) => {
  try {
    const pendingRecruiters = await RecruiterProfile.find({
      approvalStatus: ["pending", "approved", "rejected"],
    }).populate("user", "name email role");

    return res.status(200).json({
      success: true,
      total: pendingRecruiters.length,
      recruiters: pendingRecruiters,
    });
  } catch (error) {
    console.error("Get Pending Recruiters Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ APPROVE Recruiter
export const approveRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: recruiterId,
    }).populate("user");

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    if (recruiterProfile.approvalStatus === "approved") {
      return res.status(400).json({
        success: false,
        message: "Recruiter already approved",
      });
    }

    recruiterProfile.approvalStatus = "approved";
    await recruiterProfile.save();

    // Send Email
    console.log("Sending Email to: ", recruiterProfile.user.email);
    await sendEmail({
      to: recruiterProfile.user.email,
      subject: "Your Account Has Been Approved",
      html: `
        <h2>Congratulations 🎉</h2>
        <p>Your recruiter account has been approved.</p>
        <p>You can now post jobs and access full dashboard.</p>
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

// ✅ REJECT Recruiter
export const rejectRecruiter = async (req, res) => {
  try {
    const { recruiterId } = req.params;

    const recruiterProfile = await RecruiterProfile.findOne({
      user: recruiterId,
    }).populate("user");

    if (!recruiterProfile) {
      return res.status(404).json({
        success: false,
        message: "Recruiter profile not found",
      });
    }

    if (recruiterProfile.approvalStatus === "rejected") {
      return res.status(400).json({
        success: false,
        message: "Recruiter already rejected",
      });
    }

    recruiterProfile.approvalStatus = "rejected";
    await recruiterProfile.save();

    // Send Email
    console.log("Sending Email to: ", recruiterProfile.user.email);
    await sendEmail({
      to: recruiterProfile.user.email,
      subject: "Recruiter Application Rejected",
      html: `
        <h2>Application Rejected</h2>
        <p>We regret to inform you that your recruiter account was not approved.</p>
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
