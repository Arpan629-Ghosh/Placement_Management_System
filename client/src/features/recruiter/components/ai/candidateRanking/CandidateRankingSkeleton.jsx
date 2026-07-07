const CandidateRankingSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Summary */}

      <div className="grid md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-32 rounded-2xl bg-slate-200" />
        ))}
      </div>

      {/* Cards */}

      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="
          bg-white
          rounded-3xl
          shadow
          p-8
          space-y-6
          "
        >
          <div className="flex justify-between">
            <div className="space-y-3">
              <div className="h-6 w-52 rounded bg-slate-200" />

              <div className="h-4 w-36 rounded bg-slate-200" />
            </div>

            <div className="h-24 w-24 rounded-full bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-28 rounded-2xl bg-slate-200" />
            ))}
          </div>

          <div className="h-32 rounded-2xl bg-slate-200" />
        </div>
      ))}
    </div>
  );
};

export default CandidateRankingSkeleton;
