import { Trophy, Users, Medal, Star } from "lucide-react";

const CandidateRankingSummary = ({ candidates = [] }) => {
  const total = candidates.length;

  const excellent = candidates.filter((c) => c.score >= 90).length;

  const strong = candidates.filter((c) => c.score >= 80 && c.score < 90).length;

  const average = candidates.filter((c) => c.score < 80).length;

  const cards = [
    {
      title: "Applicants",
      value: total,
      icon: Users,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Excellent",
      value: excellent,
      icon: Trophy,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Strong",
      value: strong,
      icon: Medal,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Needs Review",
      value: average,
      icon: Star,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="
            bg-white
            rounded-2xl
            shadow-md
            border
            p-6
            hover:shadow-xl
            transition-all
            duration-300
            hover:-translate-y-1
            "
          >
            <div
              className={`h-12 w-12 rounded-xl flex items-center justify-center ${card.bg}`}
            >
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>

            <h2 className="mt-5 text-3xl font-bold">{card.value}</h2>

            <p className="text-slate-500 mt-1">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CandidateRankingSummary;
