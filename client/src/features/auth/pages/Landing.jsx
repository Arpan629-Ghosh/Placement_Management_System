import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// assets
import logo from "@/assets/logo.png";
import college from "@/assets/college.png";
import graduation from "@/assets/graduation.png";

import cognizant from "@/assets/recruiters/cognizant.png";
import infosys from "@/assets/recruiters/infosys.png";
import tcs from "@/assets/recruiters/tcs.png";
import wipro from "@/assets/recruiters/wipro.png";
import ibm from "@/assets/recruiters/ibm.png";
import deloitte from "@/assets/recruiters/deloitte.png";

const recruiters = [cognizant, infosys, tcs, wipro, ibm, deloitte];

const Landing = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) return;
    navigate(`/${user.role}/dashboard`, { replace: true });
  }, [user, navigate]);

  if (user?.role) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col overflow-hidden">
      {/* 🔝 NAVBAR */}
      <nav className="flex items-center justify-between px-6 py-3 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} className="w-10 h-10" />
          <h1 className="text-xl font-bold tracking-wide">PMS</h1>
        </div>

        <div className="flex gap-6 items-center">
          <button className="hover:text-blue-400 transition">Home</button>
          <button className="hover:text-blue-400 transition">Features</button>

          <button
            onClick={() => navigate("/login")}
            className="bg-blue-500 px-4 py-1.5 rounded-md hover:bg-blue-600 transition shadow-md hover:shadow-blue-500/30"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 🔥 HERO */}
      <div className="grid md:grid-cols-2 px-6 py-14 gap-12 items-center">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="overflow-hidden rounded-lg">
            <img
              src={college}
              className="w-[85%] rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
            />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold leading-snug">
            Your Gateway to{" "}
            <span className="text-blue-400">Career Excellence</span>
          </h2>

          <p className="text-gray-300 leading-relaxed">
            Empowering students with the right opportunities, enabling
            recruiters to discover top talent, and helping institutions
            streamline placements — all in one unified platform.
          </p>

          <p className="text-gray-400 text-sm">
            🚀 Trusted by leading companies | ⚡ Real-time updates | 🔒 Secure &
            scalable
          </p>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative space-y-6"
        >
          {/* 🔥 WORD-BY-WORD HEADING */}
          <h1 className="text-3xl md:text-4xl font-bold leading-snug flex flex-wrap gap-2">
            {["Bridging", "Talent", "with", "Opportunity"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={
                  word === "Talent" || word === "Opportunity"
                    ? "bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient"
                    : ""
                }
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* ✨ FADE-IN SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-gray-300 leading-relaxed"
          >
            A modern placement ecosystem designed to connect students,
            recruiters, and administrators seamlessly — making hiring faster,
            smarter, and more transparent.
          </motion.p>

          {/* IMAGE */}
          <div className="overflow-hidden rounded-lg ml-auto translate-y-12 w-[75%]">
            <img
              src={graduation}
              className="rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
            />
          </div>
        </motion.div>
      </div>

      {/* 🏢 RECRUITERS */}
      <div className="bg-white/5 backdrop-blur-md py-6 overflow-hidden border-t border-white/10">
        <h3 className="text-blue-400 mb-4 font-semibold text-center tracking-wide">
          Trusted by Industry Leaders
        </h3>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-16 w-max items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
          >
            {[...recruiters, ...recruiters].map((logo, index) => (
              <div
                key={index}
                className="bg-white/10 px-6 py-3 rounded-md hover:bg-white/20 transition"
              >
                {/* 👇 Slightly bigger logos */}
                <img src={logo} className="h-10 object-contain" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 🔻 FOOTER */}
      <footer className="bg-gray-900 text-center py-6 text-sm text-gray-400">
        <p>© 2026 PMS. All Rights Reserved.</p>

        <div className="mt-2">
          <p className="text-gray-300">Developed By</p>
          <p className="text-gray-400">
            Arpan Ghosh • Soumen Giri • Kartik Sau • Subhajit Sasmal
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-3 text-gray-500">
          <span className="hover:text-blue-400 cursor-pointer">LinkedIn</span>
          <span className="hover:text-blue-400 cursor-pointer">Facebook</span>
          <span className="hover:text-blue-400 cursor-pointer">Instagram</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
