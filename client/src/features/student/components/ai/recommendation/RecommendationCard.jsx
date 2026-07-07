import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import MatchScore from "./MatchScore";
import SkillTags from "./SkillTags";
import MissingSkillTags from "./MissingSkillTags";
import CompanyCard from "./CompanyCard";

const RecommendationCard = ({ recommendation }) => {
  const navigate = useNavigate();

  const { job, matchScore, priority, matchedSkills, missingSkills, reason } =
    recommendation;

  const priorityColor = {
    Excellent: "bg-green-500",
    High: "bg-blue-500",
    Medium: "bg-yellow-500",
    Low: "bg-red-500",
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
      bg-white
      rounded-3xl
      border
      shadow-sm
      hover:shadow-xl
      transition
      p-6
      space-y-6
      "
    >
      <CompanyCard recruiter={job.recruiter} />

      <div>
        <h2 className="text-xl font-bold">{job.title}</h2>

        <div className="mt-2">
          <span
            className={`
            px-3
            py-1
            rounded-full
            text-white
            text-xs
            ${priorityColor[priority]}
            `}
          >
            {priority} Match
          </span>
        </div>
      </div>

      <MatchScore score={matchScore} />

      <div>
        <h4 className="font-semibold mb-2">Matched Skills</h4>

        <SkillTags skills={matchedSkills} />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Missing Skills</h4>

        <MissingSkillTags skills={missingSkills} />
      </div>

      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex gap-2 items-center mb-2">
          <BrainCircuit className="text-blue-600 w-5 h-5" />

          <span className="font-semibold">AI Insight</span>
        </div>

        <p className="text-sm text-slate-600">{reason}</p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/student/jobs/${job._id}`)}
          className="
          flex-1
          bg-slate-900
          text-white
          rounded-xl
          py-3
          hover:bg-slate-700
          "
        >
          View Job
        </button>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
