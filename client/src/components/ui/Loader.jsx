const Loader = ({ size = "md", fullScreen = false, text = "" }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-14 w-14 border-4",
  };

  const content = (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`
          rounded-full
          border-indigo-600
          border-t-transparent
          animate-spin
          ${sizeClasses[size]}
        `}
      />

      {text && <p className="text-sm text-slate-500">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="
          fixed
          inset-0
          z-50
          bg-black/20
          backdrop-blur-sm
          flex
          items-center
          justify-center
        "
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10">{content}</div>
  );
};

export default Loader;
