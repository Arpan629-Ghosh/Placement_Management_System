import {
  LayoutDashboard,
  UserCheck,
  Users,
  FileBarChart,
  BarChart3,
} from "lucide-react";

export const adminSidebarMenu = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Recruiter Approvals",
    path: "/admin/recruiters",
    icon: UserCheck,
  },

  {
    name: "User Management",
    path: "/admin/users",
    icon: Users,
  },

  {
    name: "Reports",
    path: "/admin/reports",
    icon: FileBarChart,
  },

  {
    name: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];
