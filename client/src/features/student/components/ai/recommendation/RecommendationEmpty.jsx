import { BrainCircuit } from "lucide-react";

const RecommendationEmpty = () => {
  return (
    <div
      className="
      rounded-3xl
      bg-white
      border
      p-16
      text-center
      "
    >
      <BrainCircuit className="w-16 h-16 mx-auto text-blue-500" />

      <h2 className="mt-5 text-2xl font-bold">
        No AI Recommendations Available
      </h2>

      <p className="mt-2 text-slate-500">
        Upload your resume and complete your profile to receive personalized job
        recommendations.
      </p>
    </div>
  );
};

export default RecommendationEmpty;
