import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";

const Sidebar = ({
  title = "PMS",
  subtitle = "Placement Management System",
  menuItems = [],
  onLogout,
}) => {
  return (
    <aside
      className="
        w-72
        bg-slate-900
        text-white
        flex
        flex-col
        border-r
        border-slate-800
        h-screen
        sticky
        top-0
      "
    >
      {/* Logo Section */}

      <div className="px-6 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold tracking-wide">{title}</h1>

        <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
      </div>

      {/* Navigation */}

      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-200
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `
                }
              >
                <Icon size={20} />

                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Footer */}

      <div className="p-4 border-t border-slate-800">
        <button
          onClick={onLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-xl
            text-red-400
            hover:bg-red-500/10
            transition-all
          "
        >
          <LogOut size={20} />

          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
