import { Bell } from "lucide-react";

const Navbar = ({ title, subtitle, userName, department, profilePicture }) => {
  const avatarLetter = userName?.charAt(0)?.toUpperCase() || "U";

  return (
    <header
      className="
        h-20
        bg-white
        border-b
        border-slate-200
        flex
        items-center
        justify-between
        px-8
      "
    >
      {/* Left */}

      <div>
        <h2 className="text-xl font-semibold">{title}</h2>

        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} />

          <span
            className="
              absolute
              -top-1
              -right-1
              h-2.5
              w-2.5
              rounded-full
              bg-red-500
            "
          />
        </button>

        <div className="flex items-center gap-3">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="profile"
              className="
                h-10
                w-10
                rounded-full
                object-cover
                border
              "
            />
          ) : (
            <div
              className="
                h-10
                w-10
                rounded-full
                bg-indigo-600
                text-white
                flex
                items-center
                justify-center
                font-semibold
                text-sm
              "
            >
              {avatarLetter}
            </div>
          )}

          <div>
            <p className="font-medium">{userName}</p>

            {department && (
              <p className="text-xs text-slate-500">{department}</p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
