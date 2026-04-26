import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/features/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthForm from "../components/AuthForm";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const otp = location.state?.otp;

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // 🚀 SUBMIT
  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const res = await dispatch(
      resetPassword({
        email,
        otp,
        newPassword: formData.password,
      }),
    );

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Password reset successful");
      navigate("/login");
    } else {
      toast.error(res.payload?.message || "Failed to reset password");
    }
  };

  const fields = [
    {
      name: "password",
      type: "password",
      label: "New Password",
      placeholder: "Enter new password",
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Re-enter new password",
    },
  ];

  return (
    <AuthForm
      title="Create New Password"
      subtitle={
        <div className="text-center">
          <p className="text-gray-300 text-sm">Almost there!</p>
          <p className="text-gray-400 text-xs mt-1">
            Enter a strong password to secure your account.
          </p>
        </div>
      }
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Reset Password"
      footer={
        <p className="text-gray-400 text-sm">
          Back to{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      }
    />
  );
};

export default ResetPassword;
