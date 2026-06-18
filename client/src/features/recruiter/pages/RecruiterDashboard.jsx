import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";

import { getRecruiterDashboard, getRecruiterProfile } from "../recruiterThunks";

import DashboardHero from "../components/DashboardHero";
import DashboardStats from "../components/DashboardStats";
import ApplicationPipeline from "../components/ApplicationPipeline";
import RecentApplications from "../components/RecentApplications";
import RecentJobs from "../components/RecentJobs";

const RecruiterDashboard = () => {
  const dispatch = useDispatch();

  const { profile, dashboard, dashboardLoading } = useSelector(
    (state) => state.recruiter,
  );

  useEffect(() => {
    if (!profile) {
      dispatch(getRecruiterProfile());
    }

    dispatch(getRecruiterDashboard());
  }, [dispatch, profile]);

  if (dashboardLoading || !profile || !dashboard) {
    return (
      <Layout sidebarMenu={recruiterSidebarMenu}>
        <div className="py-10">
          <Loader text="Loading Dashboard..." />
        </div>
      </Layout>
    );
  }

  const { stats, recentApplications, recentJobs } = dashboard;

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Recruiter Dashboard"
      navbarSubtitle="Recruitment Overview & Analytics"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="space-y-8">
        {/* Hero */}

        <DashboardHero profile={profile}  />

        {/* Stats */}

        <DashboardStats stats={stats} />

        {/* Analytics */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          <ApplicationPipeline stats={stats} />

          <RecentJobs jobs={recentJobs} />
        </div>

        {/* Applications */}

        <RecentApplications applications={recentApplications} />
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
