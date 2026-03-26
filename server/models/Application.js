import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    resumeSnapshot: {
      url: String,
      public_id: String,
    },

    coverLetter: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "applied",
        "under_review",
        "shortlisted",
        "interview_scheduled",
        "selected",
        "rejected",
      ],
      default: "applied",
    },

    interview: {
      scheduled: {
        type: Boolean,
        default: false,
      },
      date: Date,
      mode: {
        type: String,
        enum: ["online", "offline"],
      },
      location: String,
      meetingLink: String,
    },

    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

//Prevent duplicate applications
applicationSchema.index({ student: 1, job: 1 }, { unique: true });

// Performance indexes
applicationSchema.index({ student: 1 });
applicationSchema.index({ job: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model("Application", applicationSchema);
export default Application;
