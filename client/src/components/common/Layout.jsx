import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import Loader from "@/components/ui/Loader";

import { logoutUser } from "@/features/auth/authThunks";

const Layout = ({
  children,
  sidebarMenu,
  title = "PMS",
  subtitle = "Placement Management System",

  navbarTitle,
  navbarSubtitle,
  userName,
  department,
  profilePicture,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());

    if (logoutUser.fulfilled.match(result)) {
      navigate("/login", { replace: true });
    }
  };

  if (loading) {
    return <Loader text="Logging out..." />;
  }

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar
        title={title}
        subtitle={subtitle}
        menuItems={sidebarMenu}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          title={navbarTitle}
          subtitle={navbarSubtitle}
          userName={userName}
          department={department}
          profilePicture={profilePicture}
        />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
