import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { adminSidebarMenu } from "../constants/adminSidebarMenu";

import { getDashboardStats, getGraphAnalytics } from "../adminThunks";

import { Users, Briefcase, UserCheck, FileText } from "lucide-react";
import ReportCard from "../components/ReportCard";
import Charts from "../components/Charts";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { stats, analytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
    dispatch(getGraphAnalytics());
  }, [dispatch]);

  if (loading && !stats) {
    return (
      <Layout
        sidebarMenu={adminSidebarMenu}
        title="Admin Portal"
        subtitle="Placement Management System"
      >
        <Loader text="Loading Dashboard..." />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={adminSidebarMenu}
      title="Admin Portal"
      subtitle="Placement Management System"
      navbarTitle="Admin Dashboard"
      navbarSubtitle=" Monitor platform activities and manage users."
    >
      <div className="space-y-8">
        {/* Stats */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >
          <ReportCard
            title="Total Students"
            value={stats?.totalStudents}
            icon={Users}
          />

          <ReportCard
            title="Total Recruiters"
            value={stats?.totalRecruiters}
            icon={UserCheck}
          />

          <ReportCard
            title="Total Jobs"
            value={stats?.totalJobs}
            icon={Briefcase}
          />

          <ReportCard
            title="Applications"
            value={stats?.totalApplications}
            icon={FileText}
          />
        </div>

        {/* Additional Stats */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-2
            gap-6
          "
        >
          <div
            className="
              bg-white
              rounded-3xl
              border
              p-6
            "
          >
            <h3 className="font-semibold text-lg">
              Pending Recruiter Approvals
            </h3>

            <p className="text-4xl font-bold mt-4 text-orange-600">
              {stats?.pendingRecruiters || 0}
            </p>
          </div>

          <div
            className="
              bg-white
              rounded-3xl
              border
              p-6
            "
          >
            <h3 className="font-semibold text-lg">Placed Students</h3>

            <p className="text-4xl font-bold mt-4 text-green-600">
              {stats?.totalPlacements || 0}
            </p>
          </div>
        </div>

        {/* Analytics Placeholder */}

        <div
          className="
    grid
    grid-cols-1
    xl:grid-cols-2
    gap-6
  "
        >
          <Charts
            title="Applications Per Day"
            type="line"
            data={analytics?.applicationsPerDay || []}
            xKey="date"
            dataKey="count"
          />

          <Charts
            title="Jobs Posted Per Month"
            type="bar"
            data={analytics?.jobsPerMonth || []}
            xKey="month"
            dataKey="count"
          />

          <div className="xl:col-span-2">
            <Charts
              title="Placement Trend"
              type="line"
              data={analytics?.placementTrend || []}
              xKey="month"
              dataKey="count"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
