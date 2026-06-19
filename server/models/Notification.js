import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["job", "application", "interview", "system"],
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    meta: {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
      applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
      status: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

export default mongoose.model("Notification", notificationSchema);
