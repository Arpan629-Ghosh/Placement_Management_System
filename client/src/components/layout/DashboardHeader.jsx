const DashboardHeader = ({ name = "Student", profilePicture }) => {
  const firstLetter = name?.charAt(0)?.toUpperCase() || "S";

  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-8
        bg-white
        p-6
        rounded-2xl
        border
        shadow-sm
      "
    >
      {/* Left Section */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, <span className="text-indigo-600">{name}</span>
        </h1>

        <p className="text-slate-500 mt-2">Ready for your next opportunity?</p>
      </div>

      {/* Right Section */}

      {profilePicture ? (
        <img
          src={profilePicture}
          alt={name}
          className="
            w-16
            h-16
            rounded-full
            object-cover
            border-2
            border-indigo-100
            shadow-sm
          "
        />
      ) : (
        <div
          className="
            w-16
            h-16
            rounded-full
            bg-indigo-600
            text-white
            flex
            items-center
            justify-center
            text-2xl
            font-bold
            shadow-sm
          "
        >
          {firstLetter}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
