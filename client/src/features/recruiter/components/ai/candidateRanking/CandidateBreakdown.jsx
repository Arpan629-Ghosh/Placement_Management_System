import { Brain, BriefcaseBusiness, FileText } from "lucide-react";

const CandidateBreakdown = ({ breakdown }) => {
  const cards = [
    {
      title: "Skill Match",
      value: breakdown?.skills ?? 0,
      icon: Brain,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Project Score",
      value: breakdown?.projects ?? breakdown?.project ?? 0,
      icon: BriefcaseBusiness,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      title: "Resume Score",
      value: breakdown?.resume ?? breakdown?.resumeScore ?? 0,
      icon: FileText,
      color: "text-violet-600",
      bg: "bg-violet-100",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
            bg-white
            border
            rounded-2xl
            p-5
            shadow-sm
            hover:shadow-md
            transition
            "
          >
            <div
              className={`
              h-12
              w-12
              rounded-xl
              flex
              items-center
              justify-center
              ${card.bg}
              `}
            >
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>

            <p className="text-slate-500 text-sm mt-4">{card.title}</p>

            <h2 className="text-3xl font-bold mt-1">{card.value}</h2>

            <div className="mt-4 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500"
                style={{
                  width: `${card.value}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateBreakdown;
