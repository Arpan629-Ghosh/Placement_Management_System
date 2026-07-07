import { Brain } from "lucide-react";

const AIInsightBanner = ({ recommendations }) => {
  if (!recommendations?.length) return null;

  const missingMap = {};

  recommendations.forEach((job) => {
    job.missingSkills.forEach((skill) => {
      missingMap[skill] = (missingMap[skill] || 0) + 1;
    });
  });

  const topSkills = Object.entries(missingMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-3">
        <Brain size={28} />
        <h2 className="text-2xl font-bold">AI Career Insight</h2>
      </div>

      <p className="text-indigo-100">
        Improve these skills to increase your recommendation score.
      </p>

      <div className="flex gap-3 mt-5 flex-wrap">
        {topSkills.map(([skill]) => (
          <span key={skill} className="bg-white/20 rounded-full px-4 py-2">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AIInsightBanner;
