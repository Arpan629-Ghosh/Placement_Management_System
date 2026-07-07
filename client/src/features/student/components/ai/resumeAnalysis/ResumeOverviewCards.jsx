import { Briefcase, FolderGit2, Lightbulb, Wrench } from "lucide-react";

const ResumeOverviewCards = ({ analysis }) => {
  const cards = [
    {
      title: "Skills",
      value: analysis?.skills?.length || 0,
      icon: Wrench,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Projects",
      value: analysis?.projects?.length || 0,
      icon: FolderGit2,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      title: "Experience",
      value: analysis?.experience?.length || 0,
      icon: Briefcase,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Suggestions",
      value: analysis?.suggestions?.length || 0,
      icon: Lightbulb,
      color: "text-orange-600",
      bg: "bg-orange-100",
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
            p-6
            border
            hover:shadow-lg
            transition-all
            duration-300
            hover:-translate-y-1
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

            <h2 className="mt-5 text-3xl font-bold">{card.value}</h2>

            <p className="text-slate-500 mt-1">{card.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ResumeOverviewCards;
