import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Report from "../models/Report.js";

export const generateReportService = async () => {
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalRecruiters = await User.countDocuments({ role: "recruiter" });
  const totalJobs = await Job.countDocuments();
  const activeJobs = await Job.countDocuments({ status: "active" });
  const totalApplications = await Application.countDocuments();
  const pendingApplications = await Application.countDocuments({
    status: "applied",
  });
  const placedStudents = await Application.countDocuments({
    status: "selected",
  });

  const report = await Report.create({
    totalStudents,
    totalRecruiters,
    totalJobs,
    activeJobs,
    totalApplications,
    pendingApplications,
    placedStudents,
  });

  return report;
};
