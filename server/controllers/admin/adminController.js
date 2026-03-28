import Report from "../../models/Report.js";
import User from "../../models/User.js";
import Application from "../../models/Application.js";
import Job from "../../models/Job.js";
import { generateReportService } from "../../services/reportService.js";

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
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const applicationsRaw = await Application.aggregate([
      { $match: { createdAt: { $gte: last7Days } } },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.date": 1 } },
    ]);

    const applicationsPerDay = applicationsRaw.map((item) => ({
      date: item._id.date,
      count: item.count,
    }));

    const last6Months = new Date();
    last6Months.setMonth(last6Months.getMonth() - 6);

    const jobsRaw = await Job.aggregate([
      { $match: { createdAt: { $gte: last6Months } } },
      {
        $group: {
          _id: {
            month: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const jobsPerMonth = jobsRaw.map((item) => ({
      month: item._id.month,
      count: item.count,
    }));

    const placementRaw = await Application.aggregate([
      { $match: { status: "selected" } },
      {
        $group: {
          _id: {
            month: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.month": 1 } },
    ]);

    const placementTrend = placementRaw.map((item) => ({
      month: item._id.month,
      count: item.count,
    }));

    res.json({
      success: true,
      data: {
        applicationsPerDay,
        jobsPerMonth,
        placementTrend,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
