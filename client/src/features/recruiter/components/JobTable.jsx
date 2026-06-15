const JobTable = ({ jobs = [], onEdit, onDelete }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        overflow-hidden
      "
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
              bg-slate-50
              border-b
            "
          >
            <tr>
              <th className="px-6 py-4 text-left">Job Title</th>
              <th className="px-6 py-4 text-left">Location</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Package</th>
              <th className="px-6 py-4 text-left">Deadline</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs?.length > 0 ? (
              jobs.map((job) => (
                <tr
                  key={job._id}
                  className="
                    border-b
                    hover:bg-slate-50
                  "
                >
                  <td className="px-6 py-4 font-medium">{job.title}</td>

                  <td className="px-6 py-4">{job.location}</td>

                  <td className="px-6 py-4">{job.jobType}</td>

                  <td className="px-6 py-4">₹ {job.packageOffered}</td>

                  <td className="px-6 py-4">
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }
                      `}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => onEdit(job)}
                      className="
                        bg-indigo-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(job._id)}
                      className="
                        bg-red-600
                        text-white
                        px-3
                        py-2
                        rounded-lg
                      "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="
                    text-center
                    py-10
                    text-slate-500
                  "
                >
                  No Jobs Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobTable;
