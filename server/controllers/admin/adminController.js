import Report from "../../models/Report.js";
import User from "../../models/User.js";
import Application from "../../models/Application.js";
import Job from "../../models/Job.js";
import { generateReportService } from "../../services/reportService.js";
import RecruiterProfile from "../../models/RecruiterProfile.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });

    const totalRecruiters = await User.countDocuments({ role: "recruiter" });

    const pendingRecruiters = await RecruiterProfile.countDocuments({
      approvalStatus: "pending",
    });

    const totalJobs = await Job.countDocuments();

    const totalApplications = await Application.countDocuments();

    const totalPlacements = await Application.countDocuments({
      status: "selected",
    });

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalRecruiters,
        pendingRecruiters,
        totalJobs,
        totalApplications,
        totalPlacements,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const { role, status } = req.query;

    let filter = {};
    if (role) filter.role = role;
    if (status) filter.status = status;

    const users = await User.find(filter).select("-password");
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user status (active/inactive)
export const updateUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!["active", "blocked"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be 'active' or 'blocked'.",
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { status },
      { new: true },
    );

    res.json({
      success: true,
      message: `User status updated to ${status}`,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Genarate report (Manual)

export const generateReport = async (req, res) => {
  try {
    const report = await generateReportService();

    res.json({
      success: true,
      message: "Report generated successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 }).limit(10);

    res.json({
      success: true,
      reports,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// =============================
// GRAPH ANALYTICS
// =============================
export const getGraphAnalytics = async (req, res) => {
  try {
    // =========================================
    // APPLICATIONS PER DAY (LAST 7 DAYS)
    // =========================================

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const applicationsRaw = await Application.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.date": 1,
        },
      },
    ]);

    const applicationMap = {};

    applicationsRaw.forEach((item) => {
      applicationMap[item._id.date] = item.count;
    });

    const applicationsPerDay = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();

      date.setDate(date.getDate() - i);

      const formattedDate = date.toISOString().split("T")[0];

      applicationsPerDay.push({
        date: formattedDate,
        count: applicationMap[formattedDate] || 0,
      });
    }

    // =========================================
    // JOBS PER MONTH (LAST 6 MONTHS)
    // =========================================

    const last6Months = new Date();
    last6Months.setMonth(last6Months.getMonth() - 5);

    const jobsRaw = await Job.aggregate([
      {
        $match: {
          createdAt: { $gte: last6Months },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
              },
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const jobsMap = {};

    jobsRaw.forEach((item) => {
      jobsMap[item._id.month] = item.count;
    });

    const jobsPerMonth = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setMonth(date.getMonth() - i);

      const month = date.toISOString().slice(0, 7);

      jobsPerMonth.push({
        month,
        count: jobsMap[month] || 0,
      });
    }

    // =========================================
    // PLACEMENT TREND (LAST 6 MONTHS)
    // =========================================

    const placementRaw = await Application.aggregate([
      {
        $match: {
          status: "selected",
          createdAt: { $gte: last6Months },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $dateToString: {
                format: "%Y-%m",
                date: "$createdAt",
              },
            },
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const placementMap = {};

    placementRaw.forEach((item) => {
      placementMap[item._id.month] = item.count;
    });

    const placementTrend = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();

      date.setMonth(date.getMonth() - i);

      const month = date.toISOString().slice(0, 7);

      placementTrend.push({
        month,
        count: placementMap[month] || 0,
      });
    }

    // =========================================
    // RESPONSE
    // =========================================

    return res.status(200).json({
      success: true,
      data: {
        applicationsPerDay,
        jobsPerMonth,
        placementTrend,
      },
    });
  } catch (error) {
    console.error("Graph Analytics Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
