import { CheckCircle2, XCircle } from "lucide-react";

const CandidateSkills = ({ matchedSkills = [], missingSkills = [] }) => {
  return (
    <div className="space-y-5">
      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-emerald-600 mb-3">
          <CheckCircle2 className="w-4 h-4" />
          Matched Skills ({matchedSkills.length})
        </h4>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.length ? (
            matchedSkills.map((skill) => (
              <span
                key={skill}
                className="
                px-3
                py-1
                rounded-full
                bg-emerald-50
                text-emerald-700
                text-sm
                font-medium
                border
                border-emerald-200
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">No matched skills.</p>
          )}
        </div>
      </div>

      <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-red-600 mb-3">
          <XCircle className="w-4 h-4" />
          Missing Skills ({missingSkills.length})
        </h4>

        <div className="flex flex-wrap gap-2">
          {missingSkills.length ? (
            missingSkills.map((skill) => (
              <span
                key={skill}
                className="
                px-3
                py-1
                rounded-full
                bg-red-50
                text-red-700
                text-sm
                font-medium
                border
                border-red-200
                "
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400">No missing skills.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateSkills;
