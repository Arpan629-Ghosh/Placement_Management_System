import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ApplicationPipeline = ({ stats }) => {
  const data = [
    {
      name: "Under Review",
      value: stats?.underReview || 0,
      color: "#f59e0b",
    },
    {
      name: "Shortlisted",
      value: stats?.shortlisted || 0,
      color: "#3b82f6",
    },
    {
      name: "Interview",
      value: stats?.interviewsScheduled || 0,
      color: "#8b5cf6",
    },
    {
      name: "Selected",
      value: stats?.selected || 0,
      color: "#22c55e",
    },
    {
      name: "Rejected",
      value: stats?.rejected || 0,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  const total = stats?.totalApplications || 0;

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
      "
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Hiring Pipeline</h2>

        <span className="text-sm text-slate-500">{total} Applications</span>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={4}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip />

            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
          <div
            key={item.name}
            className="
              flex
              items-center
              justify-between
              px-3
              py-2
              rounded-xl
              bg-slate-50
            "
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <span className="text-sm text-slate-600">{item.name}</span>
            </div>

            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationPipeline;
