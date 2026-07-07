const SkeletonCard = () => (
  <div className="animate-pulse rounded-3xl bg-white p-6 border">
    <div className="h-6 w-40 bg-slate-200 rounded" />

    <div className="mt-4 h-4 w-full bg-slate-200 rounded" />

    <div className="mt-2 h-4 w-2/3 bg-slate-200 rounded" />
  </div>
);

const ResumeLoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      <SkeletonCard />

      <SkeletonCard />

      <SkeletonCard />

      <SkeletonCard />
    </div>
  );
};

export default ResumeLoadingSkeleton;
