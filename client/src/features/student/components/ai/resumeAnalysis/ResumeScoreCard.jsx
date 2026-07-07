import { Sparkles } from "lucide-react";

const ResumeScoreCard = ({ analysis }) => {
  const score = analysis?.resumeScore || 0;

  const getLevel = (score) => {
    if (score >= 90) return "Excellent Resume";
    if (score >= 80) return "Strong Resume";
    if (score >= 70) return "Good Resume";
    if (score >= 60) return "Average Resume";

    return "Needs Improvement";
  };

  const getProgressColor = (score) => {
    if (score >= 90) return "border-emerald-400 shadow-emerald-400/40";

    if (score >= 80) return "border-blue-400 shadow-blue-400/40";

    if (score >= 70) return "border-yellow-400 shadow-yellow-400/40";

    if (score >= 60) return "border-orange-400 shadow-orange-400/40";

    return "border-red-400 shadow-red-400/40";
  };

  const formatDate = (date) => {
    if (!date) return "Not Available";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div
      className="
      bg-gradient-to-r
      from-indigo-600
      via-blue-600
      to-cyan-600
      rounded-3xl
      p-8
      shadow-xl
      text-white
      flex
      justify-between
      items-center
      "
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-6 h-6" />

          <h1 className="text-3xl font-bold">AI Resume Intelligence</h1>
          <div className="mt-2 inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-sm">
            <Sparkles size={15} />
            AI Powered Analysis
          </div>
        </div>

        <p className="text-indigo-100">
          AI analyzed your latest uploaded resume.
        </p>

        <div className="mt-5">
          <p className="text-sm text-indigo-200">Target Domain</p>

          <p className="font-semibold text-lg">
            {analysis?.domain || "Not Detected"}
          </p>
        </div>

        <p className="mt-5 text-sm text-indigo-200">Last Updated</p>

        <p className="font-semibold">{formatDate(analysis?.analyzedAt)}</p>
      </div>

      <div className="text-center">
        <div
          className={`
      h-40
      w-40
      rounded-full
      border-[10px]
      ${getProgressColor(score)}
      flex
      items-center
      justify-center
      bg-white/10
      backdrop-blur
      shadow-xl
  `}
        >
          <div>
            <h2 className="text-5xl font-bold">{score}</h2>

            <p className="text-lg">/100</p>
          </div>
        </div>

        <p className="mt-5 text-xl font-semibold">{getLevel(score)}</p>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
