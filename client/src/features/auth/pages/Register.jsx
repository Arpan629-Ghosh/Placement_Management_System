import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/auth/authThunks";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(registerUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      toast.success(res.payload.message);
      localStorage.setItem(
        "tempUser",
        JSON.stringify({
          name: formData.name,
          email: formData.email,
        }),
      );
      navigate("/verify-email", {
        state: { email: formData.email },
      });
    } else {
      toast.error(
        res.payload?.message || "Registration failed. Please try again.",
      );
    }
  };

  const fields = [
    { name: "name", type: "text", placeholder: "Full Name" },
    { name: "email", type: "email", placeholder: "Email ID" },
    { name: "password", type: "password", placeholder: "Password" },
    {
      name: "role",
      type: "text",
      placeholder: "Student / Recruiter / Admin",
    },
  ];

  return (
    <AuthForm
      title="Create Account"
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText={`${loading ? "Registering..." : "Sign Up"}`}
      footer={
        <p className="text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-400 cursor-pointer"
          >
            Login
          </span>
        </p>
      }
    />
  );
};

export default Register;
