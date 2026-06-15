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
      match: [/^https?:\/\/.+/, "Invalid website URL"],
    },

    designation: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    companyLogo: {
      url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true },
);

recruiterProfileSchema.index({
  approvalStatus: 1,
});

export default mongoose.model("RecruiterProfile", recruiterProfileSchema);
