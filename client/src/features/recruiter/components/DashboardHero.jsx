import StatusBadge from "./StatusBadge";

const DashboardHero = ({ profile }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        p-8
        shadow-sm
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <h1
            className="
              text-3xl
              font-bold
              text-slate-800
            "
          >
            Welcome Back, {profile?.user?.name}
          </h1>

          <p
            className="
              mt-2
              text-slate-500
            "
          >
            {profile?.companyName}
          </p>

          <div className="mt-4">
            <StatusBadge status={profile?.approvalStatus} />
          </div>
        </div>

        {profile?.companyLogo?.url && (
          <img
            src={profile.companyLogo.url}
            alt="Company Logo"
            className="
              w-20
              h-20
              rounded-full
              object-cover
              border
            "
          />
        )}
      </div>
    </div>
  );
};

export default DashboardHero;
