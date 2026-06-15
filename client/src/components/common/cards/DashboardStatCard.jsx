const DashboardStatCard = ({ title, value, icon, subtitle }) => {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        border
        border-slate-300
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">{value}</h2>

          {subtitle && (
            <p className="text-xs text-slate-400 mt-2">{subtitle}</p>
          )}
        </div>

        <div
          className="
            w-12
            h-12
            rounded-xl
            bg-blue-50
            flex
            items-center
            justify-center
            text-blue-600
          "
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;
