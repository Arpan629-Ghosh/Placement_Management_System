import { motion } from "framer-motion";

import college from "@/assets/college.png";
import graduation from "@/assets/graduation.png";

const HeroSection = () => {
  return (
    <div className="grid md:grid-cols-2 px-6 py-14 gap-12 items-center">
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
          Empowering students with the right opportunities, enabling recruiters
          to discover top talent, and helping institutions streamline placements
          — all in one unified platform.
        </p>

        <p className="text-gray-400 text-sm">
          🚀 Trusted by leading companies | ⚡ Real-time updates | 🔒 Secure &
          scalable
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative space-y-6"
      >
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

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-300 leading-relaxed"
        >
          A modern placement ecosystem designed to connect students, recruiters,
          and administrators seamlessly — making hiring faster, smarter, and
          more transparent.
        </motion.p>

        <div className="overflow-hidden rounded-lg ml-auto translate-y-12 w-[75%]">
          <img
            src={graduation}
            className="rounded-lg shadow-xl transform transition duration-500 hover:scale-105"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
