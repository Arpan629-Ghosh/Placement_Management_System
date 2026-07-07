import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ResumeStrengths = ({ strengths = [] }) => {
  if (!strengths.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl border shadow-md p-7"
    >
      <SectionHeader
        title="Strengths"
        subtitle="Things AI believes are already strong"
        count={strengths.length}
      />

      <div className="space-y-3">
        {strengths.map((item, index) => (
          <div
            key={index}
            className="flex gap-3 items-start rounded-xl bg-green-50 p-4"
          >
            <CheckCircle2 className="text-green-600 mt-1 shrink-0" />

            <p className="text-slate-700">{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResumeStrengths;
