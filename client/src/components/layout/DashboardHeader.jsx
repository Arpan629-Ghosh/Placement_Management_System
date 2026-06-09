const DashboardHeader = ({ name, profilePicture }) => {
  return (
    <div
      className="
      flex
      items-center
      justify-between
      mb-8
    "
    >
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back,
          {name}
        </h1>

        <p className="text-gray-500 mt-1">Ready for your next opportunity?</p>
      </div>

      <img
        src={profilePicture}
        alt="Profile"
        className="
          w-14
          h-14
          rounded-full
          object-cover
          border
        "
      />
    </div>
  );
};

export default DashboardHeader;
