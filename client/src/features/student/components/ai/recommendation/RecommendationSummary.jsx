import { Sparkles, Trophy, Target, BriefcaseBusiness } from "lucide-react";

const RecommendationSummary = ({ recommendations = [] }) => {
  const excellent = recommendations.filter(
    (item) => item.priority === "Excellent",
  ).length;

  const high = recommendations.filter(
    (item) => item.priority === "High",
  ).length;

  const medium = recommendations.filter(
    (item) => item.priority === "Medium",
  ).length;

  const cards = [
    {
      title: "Total Matches",
      value: recommendations.length,
      icon: BriefcaseBusiness,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Excellent",
      value: excellent,
      icon: Trophy,
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    {
      title: "High Match",
      value: high,
      icon: Sparkles,
      bg: "bg-violet-100",
      color: "text-violet-600",
    },
    {
      title: "Medium Match",
      value: medium,
      icon: Target,
      bg: "bg-amber-100",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
            "
          >
            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${card.bg}
              `}
            >
              <Icon className={`h-7 w-7 ${card.color}`} />
            </div>

            <div className="mt-8">
              <h2 className="text-4xl font-bold text-slate-900">
                {card.value}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {card.title}
              </p>
            </div>

            <div
              className={`
                absolute
                right-0
                top-0
                h-28
                w-28
                rounded-full
                opacity-10
                blur-3xl
                ${card.bg}
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RecommendationSummary;
