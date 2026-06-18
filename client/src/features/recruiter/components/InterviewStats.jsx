import { CalendarDays, Clock3, Video, MapPin } from "lucide-react";

const InterviewStats = ({ interviews = [] }) => {
  const totalInterviews = interviews.length;

  const onlineInterviews = interviews.filter(
    (item) => item.interview?.mode === "online",
  ).length;

  const offlineInterviews = interviews.filter(
    (item) => item.interview?.mode === "offline",
  ).length;

  const upcomingInterviews = interviews.filter(
    (item) =>
      item.interview?.date && new Date(item.interview.date) > new Date(),
  ).length;

  const stats = [
    {
      title: "Total Interviews",
      value: totalInterviews,
      icon: CalendarDays,
    },
    {
      title: "Upcoming",
      value: upcomingInterviews,
      icon: Clock3,
    },
    {
      title: "Online",
      value: onlineInterviews,
      icon: Video,
    },
    {
      title: "Offline",
      value: offlineInterviews,
      icon: MapPin,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              bg-white
              border
              rounded-3xl
              p-6
              shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-sm">{item.title}</p>

                <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
              </div>

              <div
                className="
                  h-12
                  w-12
                  rounded-2xl
                  bg-indigo-50
                  flex
                  items-center
                  justify-center
                "
              >
                <Icon size={22} className="text-indigo-600" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterviewStats;
