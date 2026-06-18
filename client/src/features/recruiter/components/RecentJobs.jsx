import StatusBadge from "./StatusBadge";

const RecentJobs = ({ jobs }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
      "
    >
      <h2 className="text-xl font-bold mb-6">Recent Jobs</h2>

      <div className="space-y-4">
        {jobs?.map((job) => (
          <div
            key={job._id}
            className="
              border
              rounded-2xl
              p-4
            "
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{job.title}</h3>

                <p className="text-sm text-slate-500 mt-1">
                  {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>

              <StatusBadge status={job.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
