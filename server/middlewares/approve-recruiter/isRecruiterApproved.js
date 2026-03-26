import RecruiterProfile from "../../models/RecruiterProfile.js";

export const isRecruiterApproved = async (req, res, next) => {
  try {
    const profile = await RecruiterProfile.findOne({
      user: req.user.id,
    });

    if (!profile || profile.approvalStatus !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Your account is under review. Approval required.",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
