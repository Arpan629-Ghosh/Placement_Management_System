import {
  LayoutDashboard,
  Briefcase,
  FileText,
  User,
  Sparkles,
  BrainCircuit,
} from "lucide-react";

export const studentSidebarMenu = [
  {
    name: "Dashboard",
    path: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Jobs",
    path: "/student/jobs",
    icon: Briefcase,
  },
  {
    name: "Applications",
    path: "/student/applications",
    icon: FileText,
  },
  {
    name: "Profile",
    path: "/student/profile",
    icon: User,
  },
  {
    name: "Resume Intelligence",
    path: "/student/resume-intelligence",
    icon: Sparkles,
  },
  {
    name: "Smart Job Match",
    path: "/student/smart-job-match",
    icon: BrainCircuit,
  },
];
