import { BrainCircuit } from "lucide-react";

const ResumeEmptyState = () => {
  return (
    <div
      className="

bg-white

rounded-3xl

border

shadow-md

py-20

text-center

"
    >
      <BrainCircuit size={60} className="mx-auto text-slate-400" />

      <h2 className="mt-6 text-2xl font-bold">AI Resume Analyzer</h2>

      <p className="mt-3 text-slate-500">
        Upload your resume to receive AI insights, ATS score, skills extraction,
        and personalized recommendations.
      </p>
    </div>
  );
};

export default ResumeEmptyState;
