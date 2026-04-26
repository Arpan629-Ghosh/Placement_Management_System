import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/features/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 Sources
  const tempUser = JSON.parse(localStorage.getItem("tempUser") || "null");
  const rememberedEmail = localStorage.getItem("rememberedEmail");

  const name = location.state?.name || tempUser?.name;

  // ✅ PRIORITY: navigation > tempUser > rememberedEmail
  const initialEmail =
    location.state?.email || tempUser?.email || rememberedEmail || "";

  const firstName = name?.split(" ")[0];

  // 🧠 State
  const [formData, setFormData] = useState({
    email: initialEmail,
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(!!rememberedEmail);

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(formData));

    if (res.meta.requestStatus === "fulfilled") {
      // ✅ Remember Me Logic
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // 🧹 cleanup temp data
      localStorage.removeItem("tempUser");

      navigate("/");
    }
  };

  // 🧩 Fields
  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email ID",
      autoComplete: "email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      autoComplete: "current-password",
    },
  ];

  const rememberMeUI = (
    <div className="flex items-center justify-between text-base text-gray-300">
      <label className="flex items-center gap-3 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={() => setRememberMe((prev) => !prev)}
          className="w-5 h-5 accent-blue-500 cursor-pointer"
        />
        <span className="text-base font-medium">Remember me</span>
      </label>

      <span
        onClick={() => navigate("/forgot-password")}
        className="text-blue-400 cursor-pointer hover:underline text-sm"
      >
        Forgot Password?
      </span>
    </div>
  );

  return (
    <AuthForm
      title={firstName ? `Welcome back, ${firstName}!` : "Welcome Back"}
      subtitle={rememberMeUI}
      fields={fields}
      formData={formData}
      setFormData={setFormData}
      onSubmit={handleSubmit}
      buttonText="Login"
      footer={
        <p className="text-gray-300">
          {" "}
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-400 cursor-pointer hover:underline"
          >
            {" "}
            Sign Up{" "}
          </span>{" "}
        </p>
      }
    />
  );
};

export default Login;
