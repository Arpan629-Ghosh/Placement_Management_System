import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Charts = ({
  title,
  type = "line",
  data = [],
  dataKey = "count",
  xKey = "date",
}) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
        shadow-sm
      "
    >
      <h2 className="text-xl font-semibold mb-6">{title}</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey={xKey} />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#4F46E5"
                strokeWidth={3}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey={xKey} />

              <YAxis />

              <Tooltip />

              <Legend />

              <Bar dataKey={dataKey} fill="#4F46E5" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
