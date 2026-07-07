const MatchScore = ({ score }) => {
  let color = "bg-red-500";

  if (score >= 85) color = "bg-green-500";
  else if (score >= 70) color = "bg-blue-500";
  else if (score >= 50) color = "bg-yellow-500";

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>AI Match Score</span>
        <span className="font-bold">{score}%</span>
      </div>

      <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-700`}
          style={{
            width: `${score}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MatchScore;
