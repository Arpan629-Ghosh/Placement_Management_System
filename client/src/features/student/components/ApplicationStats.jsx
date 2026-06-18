import { FileText, Eye, CheckCircle2, CalendarClock } from "lucide-react";

const ApplicationStats = ({ applications }) => {
  const stats = {
    total: applications.length,

    underReview: applications.filter((app) => app.status === "under_review")
      .length,

    shortlisted: applications.filter((app) => app.status === "shortlisted")
      .length,

    interviews: applications.filter(
      (app) => app.status === "interview_scheduled",
    ).length,
  };

  const cards = [
    {
      title: "Applied",
      value: stats.total,
      icon: <FileText size={22} />,
    },

    {
      title: "Under Review",
      value: stats.underReview,
      icon: <Eye size={22} />,
    },

    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: <CheckCircle2 size={22} />,
    },

    {
      title: "Interviews",
      value: stats.interviews,
      icon: <CalendarClock size={22} />,
    },
  ];

  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
        gap-5
      "
    >
      {cards.map((card) => (
        <div
          key={card.title}
          className="
            bg-white
            rounded-3xl
            border
            border-slate-200
            p-5
            shadow-sm
          "
        >
          <div className="flex justify-between items-center">
            <div>
              <p className="text-slate-500 text-sm">{card.title}</p>

              <h3 className="text-3xl font-bold text-slate-800 mt-2">
                {card.value}
              </h3>
            </div>

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-indigo-50
                flex
                items-center
                justify-center
                text-indigo-600
              "
            >
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationStats;
