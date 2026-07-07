import { XCircle } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ResumeWeaknesses = ({ weaknesses = [] }) => {
  if (!weaknesses.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border shadow-md p-7"
    >
      <SectionHeader
        title="Weaknesses"
        subtitle="Areas that reduce resume quality"
        count={weaknesses.length}
      />

      <div className="space-y-3">
        {weaknesses.map((item, index) => (
          <div key={index} className="bg-red-50 rounded-xl p-4 flex gap-3">
            <XCircle className="text-red-500 mt-1" />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResumeWeaknesses;
