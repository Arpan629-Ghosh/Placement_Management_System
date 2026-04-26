import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassword } from "@/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(forgotPassword(formData.email));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP sent to your email");

      navigate("/verify-reset-otp", {
        state: { email: formData.email },
      });
    } else {
      toast.error(res.payload?.message || "Something went wrong");
    }
  };

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Enter your registered email",
    },
  ];

  return (
    <AuthForm
      title="Forgot Password?"
      subtitle={
        <>
          <p className="text-gray-300 text-sm text-center mb-2">
            Don’t worry, it happens.
          </p>
          <p className="text-gray-400 text-xs text-center">
            Enter your registered email and we’ll send you a secure OTP to reset
            your password.
          </p>
        </>
      }
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Send Reset OTP"
      footer={
        <p className="text-gray-300 text-sm">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </p>
      }
    />
  );
};

export default ForgotPassword;
