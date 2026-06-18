import {
  Briefcase,
  FileText,
  Clock3,
  Star,
  CalendarDays,
  CheckCircle2,
} from "lucide-react";

import StatCard from "./StatCard";

const DashboardStats = ({ stats }) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        gap-6
      "
    >
      <StatCard
        icon={Briefcase}
        title="Total Jobs"
        value={stats?.totalJobs || 0}
        color="bg-indigo-100 text-indigo-700"
      />

      <StatCard
        icon={FileText}
        title="Applications"
        value={stats?.totalApplications || 0}
        color="bg-blue-100 text-blue-700"
      />

      <StatCard
        icon={Clock3}
        title="Under Review"
        value={stats?.underReview || 0}
        color="bg-yellow-100 text-yellow-700"
      />

      <StatCard
        icon={Star}
        title="Shortlisted"
        value={stats?.shortlisted || 0}
        color="bg-cyan-100 text-cyan-700"
      />

      <StatCard
        icon={CalendarDays}
        title="Interviews"
        value={stats?.interviewsScheduled || 0}
        color="bg-purple-100 text-purple-700"
      />

      <StatCard
        icon={CheckCircle2}
        title="Selected"
        value={stats?.selected || 0}
        color="bg-green-100 text-green-700"
      />
    </div>
  );
};

export default DashboardStats;
