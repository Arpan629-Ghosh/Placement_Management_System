import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail, resendOtp } from "@/features/auth/authThunks";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "@/assets/logo.png";
import college from "@/assets/college.png";

const OTP_EXPIRY = 5 * 60; // ⏱ 5 minutes

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef([]);

  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY);
  const [loading, setLoading] = useState(false);

  // ⏱ TIMER
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // 🔢 INPUT CHANGE
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // ⬅️ BACKSPACE
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // 📋 PASTE
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

  // ⚡ AUTO SUBMIT
  useEffect(() => {
    const finalOtp = otp.join("");

    if (finalOtp.length === 6 && !otp.includes("")) {
      handleVerify(finalOtp);
    }
  }, [otp]);

  // 🚀 VERIFY
  const handleVerify = async (otpParam) => {
    const finalOtp = otpParam || otp.join("");

    if (finalOtp.length !== 6) return;

    setLoading(true);

    const res = await dispatch(verifyEmail({ email, otp: finalOtp }));

    setLoading(false);

    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Email verified successfully");

      navigate("/login", {
        state: { email },
      });
    } else {
      toast.error(res.payload?.message || "Invalid OTP");
      setOtp(Array(6).fill(""));
      inputsRef.current[0]?.focus();
    }
  };

  // 🔁 RESEND
  const handleResend = async () => {
    if (timeLeft > 0) return;

    await dispatch(resendOtp(email));
    toast.success("OTP resent");

    setTimeLeft(OTP_EXPIRY);
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

        <h2 className="text-2xl font-semibold text-white mb-2">
          Verify Your Email
        </h2>

        <p className="text-gray-300 text-sm mb-6">
          Enter the 6-digit OTP sent to <br />
          <span className="text-blue-400">{email}</span>
        </p>

        {/* 🔢 OTP INPUT */}
        <div className="flex justify-between gap-2 mb-6 px-1">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
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

        {/* VERIFY BUTTON */}
        <button
          onClick={() => handleVerify()}
          disabled={loading}
          className={`w-full py-2.5 rounded-md font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND */}
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

export default VerifyEmail;
