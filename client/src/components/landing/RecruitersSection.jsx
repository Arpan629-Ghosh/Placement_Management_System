import { motion } from "framer-motion";

import cognizant from "@/assets/recruiters/cognizant.png";
import infosys from "@/assets/recruiters/infosys.png";
import tcs from "@/assets/recruiters/tcs.png";
import wipro from "@/assets/recruiters/wipro.png";
import ibm from "@/assets/recruiters/ibm.png";
import deloitte from "@/assets/recruiters/deloitte.png";

const recruiters = [cognizant, infosys, tcs, wipro, ibm, deloitte];

const RecruitersSection = () => {
  return (
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
              <img src={logo} className="h-10 object-contain" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RecruitersSection;
