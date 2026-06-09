import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({
  children,
  sidebarMenu,
  title = "PMS",
  subtitle = "Placement Management System",
}) => {
  const handleLogout = () => {
    console.log("logout");
  };

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <Sidebar
        title={title}
        subtitle={subtitle}
        menuItems={sidebarMenu}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
