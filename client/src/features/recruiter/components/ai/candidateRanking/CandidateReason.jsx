import { Brain, BriefcaseBusiness, FileText } from "lucide-react";

const CandidateReason = ({ reason, projectScore, resumeScore }) => {
  return (
    <div
      className="
      rounded-2xl
      bg-slate-50
      border
      border-slate-200
      p-5
      space-y-5
      "
    >
      <div>
        <h3 className="flex items-center gap-2 font-semibold text-slate-800">
          <Brain className="w-5 h-5 text-indigo-500" />
          AI Recommendation
        </h3>

        <p className="text-slate-600 mt-2 leading-7">{reason}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div
          className="
          rounded-xl
          bg-white
          border
          p-4
          text-center
          "
        >
          <BriefcaseBusiness className="mx-auto w-5 h-5 text-blue-500" />

          <p className="mt-2 text-xs text-slate-500">Project Score</p>

          <h2 className="text-2xl font-bold text-slate-800">{projectScore}</h2>
        </div>

        <div
          className="
          rounded-xl
          bg-white
          border
          p-4
          text-center
          "
        >
          <FileText className="mx-auto w-5 h-5 text-emerald-500" />

          <p className="mt-2 text-xs text-slate-500">Resume Score</p>

          <h2 className="text-2xl font-bold text-slate-800">{resumeScore}</h2>
        </div>
      </div>
    </div>
  );
};

export default CandidateReason;
