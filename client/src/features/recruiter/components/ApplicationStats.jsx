import {
  FileText,
  Eye,
  Users,
  CalendarCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ApplicationStats = ({ applications = [] }) => {
  const stats = {
    total: applications.length,

    applied: applications.filter((a) => a.status === "applied").length,

    underReview: applications.filter((a) => a.status === "under_review").length,

    shortlisted: applications.filter((a) => a.status === "shortlisted").length,

    interviewScheduled: applications.filter(
      (a) => a.status === "interview_scheduled",
    ).length,

    selected: applications.filter((a) => a.status === "selected").length,

    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  const cards = [
    {
      title: "Total",
      value: stats.total,
      icon: FileText,
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      title: "Review",
      value: stats.underReview,
      icon: Eye,
      bg: "bg-yellow-50",
      text: "text-yellow-600",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: Users,
      bg: "bg-purple-50",
      text: "text-purple-600",
    },
    {
      title: "Interviews",
      value: stats.interviewScheduled,
      icon: CalendarCheck,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      title: "Selected",
      value: stats.selected,
      icon: CheckCircle,
      bg: "bg-green-50",
      text: "text-green-600",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      bg: "bg-red-50",
      text: "text-red-600",
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-2
        md:grid-cols-3
        xl:grid-cols-6
        gap-4
      "
    >
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              bg-white
              border
              rounded-2xl
              p-4
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.title}</p>

                <h3 className="text-2xl font-bold mt-1">{card.value}</h3>
              </div>

              <div className={`${card.bg} p-3 rounded-xl`}>
                <Icon size={20} className={card.text} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationStats;
