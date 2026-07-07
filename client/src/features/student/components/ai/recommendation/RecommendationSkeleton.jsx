import Layout from "@/components/common/Layout";

const RecommendationSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-40 rounded-3xl bg-slate-200" />

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-72 rounded-3xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
};

export default RecommendationSkeleton;
