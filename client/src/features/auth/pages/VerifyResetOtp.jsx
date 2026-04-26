import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword, resendOtp, verifyResetOtp } from "../authThunks";
import logo from "@/assets/logo.png";
import college from "@/assets/college.png";

const OTP_EXPIRY_TIME = 10 * 60; // 10 minutes in seconds

const VerifyResetOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
  const [isVerifying, setIsVerifying] = useState(false);

  // ⏱ TIMER COUNTDOWN
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🔢 FORMAT TIMER MM:SS
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // ✏️ INPUT CHANGE
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // 📋 PASTE SUPPORT
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);

    newOtp.forEach((digit, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = digit;
      }
    });
  };

  // ⌨️ BACKSPACE NAVIGATION
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // ⚡ AUTO SUBMIT WHEN FILLED
  useEffect(() => {
    const finalOtp = otp.join("");

    if (finalOtp.length === 6 && !otp.includes("")) {
      handleSubmit(finalOtp);
    }
  }, [otp]);

  // 🚀 VERIFY OTP
  const handleSubmit = async (finalOtpParam) => {
    const finalOtp = finalOtpParam || otp.join("");

    if (finalOtp.length !== 6) return;

    setIsVerifying(true);

    const res = await dispatch(verifyResetOtp({ email, otp: finalOtp }));

    setIsVerifying(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("OTP verified");

      navigate("/reset-password", {
        state: { email, otp: finalOtp },
      });
    } else {
      toast.error(res.payload?.message || "Invalid OTP");
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  // 🔁 RESEND OTP
  const handleResend = async () => {
    if (timeLeft > 0) return;

    await dispatch(forgotPassword(email));
    toast.success("OTP resent");

    setTimeLeft(OTP_EXPIRY_TIME);
    setOtp(Array(6).fill(""));
    inputsRef.current[0]?.focus();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center"
      style={{ backgroundImage: `url(${college})` }}
    >
      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* 🌟 CARD */}
      <div
        className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl 
        bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center"
      >
        {/* LOGO */}
        <div className="flex justify-center mb-4">
          <img src={logo} className="w-14 h-14 rounded-full" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">Verify OTP</h2>

        <p className="text-gray-300 text-sm mb-6">
          Enter the 6-digit code sent to your email
        </p>

        {/* 🔢 OTP INPUTS */}
        <div className="flex justify-between gap-2 mb-6 px-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              value={digit}
              type="text"
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onPaste={handlePaste}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg font-semibold rounded-lg
                bg-white/5 border border-white/20 text-white
                focus:border-blue-500 focus:ring-2 focus:ring-blue-500
                outline-none transition-all"
            />
          ))}
        </div>

        {/* ⏱ TIMER */}
        <p className="text-sm text-gray-400 mb-4">
          OTP expires in{" "}
          <span className="text-blue-400 font-medium">{formatTime()}</span>
        </p>

        {/* BUTTON */}
        <button
          onClick={() => handleSubmit()}
          disabled={isVerifying}
          className={`w-full py-2.5 rounded-md font-semibold transition ${
            isVerifying
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>

        {/* 🔁 RESEND */}
        <button
          onClick={handleResend}
          disabled={timeLeft > 0}
          className={`mt-4 text-sm ${
            timeLeft > 0
              ? "text-gray-500 cursor-not-allowed"
              : "text-blue-400 hover:underline"
          }`}
        >
          {timeLeft > 0 ? `Resend OTP in ${formatTime()}` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default VerifyResetOtp;
