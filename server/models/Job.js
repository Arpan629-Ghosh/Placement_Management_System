import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    jobType: {
      type: String,
      enum: ["full_time", "part_time", "internship", "contract"],
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    eligibilityCriteria: {
      minCGPA: Number,
      departmentAllowed: [String],
      allowedYears: [Number],
    },

    salaryRange: {
      type: String,
      trim: true,
    },

    applicationDeadline: {
      type: Date,
      required: true,
    },

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({ status: 1 });
jobSchema.index({ applicationDeadline: 1 });
jobSchema.index({ recruiter: 1 });

const Job = mongoose.model("Job", jobSchema);
export default Job;
