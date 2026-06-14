import { format } from "date-fns";

const ReportTable = ({ reports = [] }) => {
  if (!reports.length) {
    return (
      <div
        className="
          bg-white
          border
          rounded-3xl
          p-10
          text-center
        "
      >
        <h3 className="text-lg font-semibold">No Reports Found</h3>

        <p className="text-slate-500 mt-2">
          Generate your first report to view statistics.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        overflow-hidden
        shadow-sm
      "
    >
      {/* Header */}

      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">Report History</h2>

        <p className="text-sm text-slate-500 mt-1">
          Latest generated placement reports
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Generated On
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Students
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Recruiters
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Jobs
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Active Jobs
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Applications
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Pending Apps
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Placements
              </th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report._id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="px-5 py-4 whitespace-nowrap">
                  {format(new Date(report.createdAt), "dd MMM yyyy, hh:mm a")}
                </td>

                <td className="px-5 py-4">{report.totalStudents}</td>

                <td className="px-5 py-4">{report.totalRecruiters}</td>

                <td className="px-5 py-4">{report.totalJobs}</td>

                <td className="px-5 py-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-green-100
                      text-green-700
                    "
                  >
                    {report.activeJobs}
                  </span>
                </td>

                <td className="px-5 py-4">{report.totalApplications}</td>

                <td className="px-5 py-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-orange-100
                      text-orange-700
                    "
                  >
                    {report.pendingApplications}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-medium
                      bg-indigo-100
                      text-indigo-700
                    "
                  >
                    {report.placedStudents}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div
        className="
          p-4
          border-t
          bg-slate-50
          text-sm
          text-slate-500
        "
      >
        Total Reports: {reports.length}
      </div>
    </div>
  );
};

export default ReportTable;
