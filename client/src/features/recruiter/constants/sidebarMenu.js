import {
  LayoutDashboard,
  User,
  Briefcase,
  FileText,
  CalendarDays,
} from "lucide-react";

export const recruiterSidebarMenu = [
  {
    name: "Dashboard",
    path: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },

  {
    name: "Profile",
    path: "/recruiter/profile",
    icon: User,
  },

  // Phase 2
  {
    name: "Jobs",
    path: "/recruiter/jobs",
    icon: Briefcase,
  },

  // Phase 3
  {
    name: "Applications",
    path: "/recruiter/applications",
    icon: FileText,
  },

  // Phase 3
  {
    name: "Interviews",
    path: "/recruiter/interviews",
    icon: CalendarDays,
  },
];
