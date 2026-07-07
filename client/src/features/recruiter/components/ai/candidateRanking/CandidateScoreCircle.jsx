import { motion } from "framer-motion";

const CandidateScoreCircle = ({ score }) => {
  const getColor = () => {
    if (score >= 90) return "text-emerald-500";
    if (score >= 80) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 60) return "text-yellow-500";

    return "text-red-500";
  };

  const getStroke = () => {
    if (score >= 90) return "stroke-emerald-500";
    if (score >= 80) return "stroke-green-500";
    if (score >= 70) return "stroke-blue-500";
    if (score >= 60) return "stroke-yellow-500";

    return "stroke-red-500";
  };

  const radius = 44;
  const circumference = 2 * Math.PI * radius;

  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="relative h-28 w-28">
      <svg className="rotate-[-90deg]" width="112" height="112">
        <circle
          cx="56"
          cy="56"
          r={radius}
          strokeWidth="8"
          className="stroke-slate-200 fill-none"
        />

        <motion.circle
          cx="56"
          cy="56"
          r={radius}
          strokeWidth="8"
          strokeLinecap="round"
          className={`${getStroke()} fill-none`}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: progress }}
          transition={{ duration: 1 }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className={`text-2xl font-bold ${getColor()}`}>{score}</h2>

        <p className="text-xs text-slate-500">Score</p>
      </div>
    </div>
  );
};

export default CandidateScoreCircle;
