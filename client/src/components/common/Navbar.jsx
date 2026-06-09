import { Bell } from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { profile } = useSelector((state) => state.student);

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
      <div>
        <h2 className="text-xl font-semibold">Student Dashboard</h2>

        <p className="text-sm text-slate-500">Manage jobs and applications</p>
      </div>

      <div className="flex items-center gap-6">
        {/* Notification */}

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

        {/* Profile */}

        <div className="flex items-center gap-3">
          <img
            src={
              profile?.profilePicture?.url ||
              "https://ui-avatars.com/api/?name=Student"
            }
            alt="profile"
            className="
              h-10
              w-10
              rounded-full
              object-cover
            "
          />

          <div>
            <p className="font-medium">{profile?.user?.name || "Student"}</p>

            <p className="text-xs text-slate-500">
              {profile?.department || ""}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
