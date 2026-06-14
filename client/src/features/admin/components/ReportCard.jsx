import React from "react";

const ReportCard = ({
  title,
  value,
  icon: Icon,
  iconBg = "bg-indigo-100",
  iconColor = "text-indigo-600",
}) => {
  return (
    <div
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
          <p className="text-sm text-slate-500">{title}</p>

          <h3 className="text-3xl font-bold mt-2">{value ?? 0}</h3>
        </div>

        {Icon && (
          <div
            className={`
              h-12
              w-12
              rounded-xl
              flex
              items-center
              justify-center
              ${iconBg}
            `}
          >
            <Icon size={24} className={iconColor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportCard;
