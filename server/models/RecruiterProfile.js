import mongoose from "mongoose";

const recruiterProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyWebsite: {
      type: String,
      trim: true,
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    companyLogo: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("RecruiterProfile", recruiterProfileSchema);
