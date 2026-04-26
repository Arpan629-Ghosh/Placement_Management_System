import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import college from "@/assets/college.png";

const AuthForm = ({
  title,
  subtitle,
  fields,
  formData,
  setFormData,
  onSubmit,
  buttonText,
  footer,
}) => {
  const inputRefs = useRef([]);
  const [errors, setErrors] = useState({});

  // 🔍 VALIDATION FUNCTION
  const validateField = (name, value) => {
    if (!value) return "This field is required";

    if (name === "email") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(value)) return "Invalid email format";
    }

    if (name === "password" || name === "confirmPassword") {
      if (value.length < 6) return "Password must be at least 6 characters";
    }

    return "";
  };

  // 🔍 VALIDATE ALL
  const validateAll = () => {
    const newErrors = {};

    // 🔍 Field-level validation
    fields.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) newErrors[field.name] = error;
    });

    // 🔐 Cross-field validation (IMPORTANT)
    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔑 HANDLE INPUT CHANGE
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });

    // remove error instantly when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ⌨️ ENTER NAVIGATION
  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const field = fields[index];
      const error = validateField(field.name, formData[field.name]);

      if (error) {
        setErrors((prev) => ({ ...prev, [field.name]: error }));
        return;
      }

      if (index < fields.length - 1) {
        inputRefs.current[index + 1]?.focus();
      } else {
        handleSubmit(e);
      }
    }
  };

  // 🚀 SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateAll()) return;

    onSubmit(e);
  };

  // 🔥 AUTO FOCUS FIRST FIELD
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const isFormValid =
    fields.every((f) => formData[f.name]) &&
    Object.values(errors).every((err) => !err);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${college})`,
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl 
                   bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <img src={logo} className="w-14 h-14 rounded-full" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-white mb-6">
          {title}
        </h2>

        {subtitle && <div className="mb-6 font-semibold">{subtitle}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map((field, index) => (
            <div key={field.name} className="flex flex-col gap-1">
              <label className="text-sm text-gray-300">{field.label}</label>

              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-full px-4 py-2.5 rounded-md 
                  bg-white/5 text-white placeholder-gray-400
                  border ${errors[field.name] ? "border-red-400" : "border-white/20"}
                  outline-none
                  focus:ring-2 ${
                    errors[field.name]
                      ? "focus:ring-red-400"
                      : "focus:ring-blue-500"
                  }
                  transition`}
              />

              {/* ❌ ERROR MESSAGE */}
              {errors[field.name] && (
                <span className="text-red-400 text-xs">
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2.5 rounded-md font-semibold transition
              ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-500 cursor-not-allowed"
              }`}
          >
            {buttonText}
          </button>
        </form>

        {footer && (
          <div className="mt-6 text-center text-sm text-gray-300">{footer}</div>
        )}
      </motion.div>
    </div>
  );
};

export default React.memo(AuthForm);
