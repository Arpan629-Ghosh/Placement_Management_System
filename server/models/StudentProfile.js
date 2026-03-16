import mongoose from "mongoose";

const workExperienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    startDate: Date,
    endDate: Date,
    currentlyWorking: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const certificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    issuedBy: {
      type: String,
      trim: true,
    },
    year: Number,
  },
  { _id: false },
);

const studentProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    rollNumber: {
      type: String,
      trim: true,
    },

    contactNumber: {
      type: String,
      trim: true,
    },

    department: {
      type: String,
      trim: true,
    },

    yearOfPassing: Number,

    resume: {
      url: String,
      public_id: String,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    certifications: [certificationSchema],

    workExperience: [workExperienceSchema],

    profilePicture: {
      url: String,
      public_id: String,
    },

    availabilityStatus: {
      type: String,
      enum: ["open", "placed", "not_looking"],
      default: "open",
    },
  },
  {
    timestamps: true,
  },
);

studentProfileSchema.index({ department: 1, yearOfPassing: 1 });

const StudentProfile = mongoose.model("StudentProfile", studentProfileSchema);

export default StudentProfile;
