import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import { Briefcase, FileText, Award, UserCheck } from "lucide-react";

import DashboardHeader from "../../../components/layout/DashboardHeader";
import DashboardStatCard from "../../../components/common/cards/DashboardStatCard";
import SearchBar from "../../../components/common/inputs/SearchBar";
import EmptyState from "../../../components/layout/EmptyState";
import JobCard from "../components/JobCard";
import ApplicationCard from "../components/ApplicationCard";

import { getJobs, getApplications } from "../studentThunks";
import { studentSidebarMenu } from "../constants/SidebarMenu";

const StudentDashboard = () => {
  const dispatch = useDispatch();

  const { profile, jobs, applications, loading } = useSelector(
    (state) => state.student,
  );

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getJobs());
    dispatch(getApplications());
    console.log("Profile in Dashboard:", profile);
  }, [dispatch]);

  console.log("Dashboard Rendered");

  const filteredJobs = useMemo(() => {
    if (!searchTerm.trim()) return jobs;

    const keyword = searchTerm.toLowerCase();

    return jobs.filter(
      (job) =>
        job.title?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword) ||
        job.jobType?.toLowerCase().includes(keyword),
    );
  }, [jobs, searchTerm]);

  const stats = [
    {
      title: "Available Jobs",
      value: jobs?.length || 0,
      subtitle: "Open opportunities",
      icon: <Briefcase size={24} />,
    },
    {
      title: "Applications",
      value: applications?.length || 0,
      subtitle: "Jobs applied",
      icon: <FileText size={24} />,
    },
    {
      title: "Skills",
      value: profile?.skills?.length || 0,
      subtitle: "Skills added",
      icon: <Award size={24} />,
    },
    {
      title: "Status",
      value:
        profile?.availabilityStatus === "open"
          ? "Open"
          : profile?.availabilityStatus || "N/A",
      subtitle: "Placement status",
      icon: <UserCheck size={24} />,
    },
  ];

  if (loading && !profile) {
    return (
      <Layout>
        <Loader text="Loading Dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout sidebarMenu={studentSidebarMenu}>
      <div className="space-y-8">
        {/* Header */}

        <DashboardHeader profile={profile} />

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
                    <JobCard key={job._id} job={job} />
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
                  {applications.length}
                </span>
              </div>

              {applications.length === 0 ? (
                <EmptyState
                  title="No Applications Yet"
                  description="Apply for jobs and track them here."
                />
              ) : (
                <div className="space-y-4">
                  {applications.slice(0, 5).map((application) => (
                    <ApplicationCard
                      key={application._id}
                      application={application}
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
