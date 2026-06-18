// eslint-disable-next-line no-unused-vars
const StatCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-6
        shadow-sm
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p
            className="
              text-sm
              text-slate-500
              mb-2
            "
          >
            {title}
          </p>

          <h3
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >
            {value}
          </h3>
        </div>

        <div
          className={`
            w-12 h-12
            rounded-2xl
            flex items-center justify-center
            ${color}
          `}
        >
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
