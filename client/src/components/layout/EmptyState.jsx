const EmptyState = ({ title, subtitle }) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border
      p-8
      text-center
    "
    >
      <h3 className="font-semibold">{title}</h3>

      <p className="text-sm text-gray-500 mt-2">{subtitle}</p>
    </div>
  );
};

export default EmptyState;
