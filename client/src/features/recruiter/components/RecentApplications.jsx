import StatusBadge from "./StatusBadge";

const RecentApplications = ({ applications }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
      "
    >
      <h2 className="text-xl font-bold mb-6">Recent Applications</h2>

      <div className="space-y-4">
        {applications?.map((application) => (
          <div
            key={application._id}
            className="
              border
              rounded-2xl
              p-4
            "
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{application.student?.name}</h3>

                <p className="text-sm text-slate-500">
                  {application.student?.email}
                </p>

                <p className="text-sm mt-1">{application.job?.title}</p>
              </div>

              <StatusBadge status={application.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentApplications;
