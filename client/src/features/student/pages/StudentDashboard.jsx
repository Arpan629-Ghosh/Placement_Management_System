import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import { Briefcase, FileText, Award, UserCheck } from "lucide-react";

import DashboardHeader from "@/components/layout/DashboardHeader";
import DashboardStatCard from "@/components/common/cards/DashboardStatCard";
import SearchBar from "@/components/common/inputs/SearchBar";
import EmptyState from "@/components/layout/EmptyState";
import JobCard from "../components/JobCard";
import ApplicationCard from "../components/ApplicationCard";

import { getDashboard } from "../studentThunks";
import { studentSidebarMenu } from "../constants/SidebarMenu";

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { profile, dashboard, dashboardFetched, dashboardLoading } =
    useSelector((state) => state.student);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!dashboardFetched && !dashboardLoading) {
      dispatch(getDashboard());
    }
  }, [dispatch, dashboardFetched, dashboardLoading]);

  const recentJobs = dashboard?.recentJobs ?? [];
  const recentApplications = dashboard?.recentApplications ?? [];
  const dashboardStats = dashboard?.stats ?? {};
  const studentProfile = profile || dashboard?.student || null;

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return recentJobs;

    const keyword = searchTerm.toLowerCase();

    return recentJobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword) ||
        job.jobType?.toLowerCase().includes(keyword),
    );
  }, [recentJobs, searchTerm]);

  const stats = [
    {
      title: "Available Jobs",
      value: recentJobs.length,
      subtitle: "Open opportunities",
      icon: <Briefcase size={24} />,
    },
    {
      title: "Applications",
      value: dashboardStats.totalApplications || recentApplications.length,
      subtitle: "Jobs applied",
      icon: <FileText size={24} />,
    },
    {
      title: "Skills",
      value: studentProfile?.skills?.length || 0,
      subtitle: "Skills added",
      icon: <Award size={24} />,
    },
    {
      title: "Status",
      value:
        studentProfile?.availabilityStatus === "open"
          ? "Open"
          : studentProfile?.availabilityStatus || "N/A",
      subtitle: "Placement status",
      icon: <UserCheck size={24} />,
    },
  ];

  if (!dashboardFetched) {
    return (
      <Layout
        sidebarMenu={studentSidebarMenu}
        navbarTitle="Student Dashboard"
        navbarSubtitle="Manage jobs and applications"
        userName={profile?.user?.name}
        department={profile?.department}
        profilePicture={profile?.profilePicture?.url}
      >
        <Loader text="Loading Dashboard..." />
      </Layout>
    );
  }

  const formatAppliedAt = (value) => {
    if (!value) return "Recently";

    return new Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  };

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Student Dashboard"
      navbarSubtitle="Manage jobs and applications"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <div className="space-y-8">
        {/* Header */}

        <DashboardHeader
          name={profile?.user?.name || dashboard?.student?.name}
          profilePicture={profile?.profilePicture?.url}
        />

        {/* Search */}

        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs by title, location or type..."
        />

        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <DashboardStatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Main Content */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Jobs Section */}

          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Available Jobs</h2>

                <span className="text-sm text-slate-500">
                  {filteredJobs.length} Jobs
                </span>
              </div>

              {filteredJobs.length === 0 ? (
                <EmptyState
                  title="No Jobs Found"
                  description="Try another search keyword."
                />
              ) : (
                <div className="space-y-4">
                  {filteredJobs.slice(0, 5).map((job) => (
                    <JobCard
                      key={job._id}
                      jobId={job._id}
                      companyLogo={
                        job.companyLogo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          job.companyName || "Company",
                        )}`
                      }
                      companyName={job.companyName || "Unknown Company"}
                      title={job.title}
                      location={job.location || "Location not specified"}
                      salary={
                        job.salaryRange
                          ? `₹${job.salaryRange.min?.toLocaleString()} - ₹${job.salaryRange.max?.toLocaleString()}`
                          : "Salary not disclosed"
                      }
                      jobType={job.jobType?.replaceAll("_", " ") || "N/A"}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Applications Section */}

          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Recent Applications</h2>

                <span className="text-sm text-slate-500">
                  {recentApplications.length}
                </span>
              </div>

              {recentApplications.length === 0 ? (
                <EmptyState
                  title="No Applications Yet"
                  description="Apply for jobs and track them here."
                />
              ) : (
                <div className="space-y-4">
                  {recentApplications.slice(0, 5).map((application) => (
                    <ApplicationCard
                      key={application._id}
                      companyName={application.companyName || "Unknown Company"}
                      title={application.title || "Untitled Job"}
                      status={application.status}
                      appliedAt={formatAppliedAt(application.appliedAt)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentDashboard;
