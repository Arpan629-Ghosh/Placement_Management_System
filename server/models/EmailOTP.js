import mongoose from "mongoose";

const emailOTPSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    otp: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const EmailOTP = mongoose.model("EmailOTP", emailOTPSchema);
export default EmailOTP;
