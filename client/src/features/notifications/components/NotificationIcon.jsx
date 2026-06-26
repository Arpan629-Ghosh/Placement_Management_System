import { Briefcase, FileText, CalendarDays, Bell } from "lucide-react";

const NotificationIcon = ({ type }) => {
  const config = {
    job: {
      icon: Briefcase,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },

    application: {
      icon: FileText,
      bg: "bg-green-100",
      color: "text-green-600",
    },

    interview: {
      icon: CalendarDays,
      bg: "bg-purple-100",
      color: "text-purple-600",
    },

    system: {
      icon: Bell,
      bg: "bg-slate-100",
      color: "text-slate-600",
    },
  };

  const item = config[type] || config.system;

  const Icon = item.icon;

  return (
    <div
      className={`
        w-10 h-10
        rounded-xl
        flex items-center justify-center
        ${item.bg}
      `}
    >
      <Icon size={18} className={item.color} />
    </div>
  );
};

export default NotificationIcon;
