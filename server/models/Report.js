import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    totalStudents: Number,
    totalRecruiters: Number,
    totalJobs: Number,
    activeJobs: Number,
    totalApplications: Number,
    pendingApplications: Number,
    placedStudents: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Report", reportSchema);
