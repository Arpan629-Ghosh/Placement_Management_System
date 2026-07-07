import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const ResumeSuggestions = ({ suggestions = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl border shadow-md p-7"
    >
      <SectionHeader
        title="AI Suggestions"
        subtitle="Recommended improvements"
        count={suggestions.length}
      />

      <div className="space-y-4">
        {suggestions.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border-l-4 border-blue-500 bg-slate-50 p-5"
          >
            <div className="flex gap-3">
              <Lightbulb className="text-blue-600 shrink-0" />

              <p>{item}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ResumeSuggestions;
