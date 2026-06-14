import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import Charts from "../components/Charts";

import { adminSidebarMenu } from "../constants/adminSidebarMenu";

import { getGraphAnalytics } from "../adminThunks";

const AnalyticsPage = () => {
  const dispatch = useDispatch();

  const { analytics, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getGraphAnalytics());
  }, [dispatch]);

  if (loading && !analytics) {
    return (
      <Layout sidebarMenu={adminSidebarMenu}>
        <Loader text="Loading Analytics..." />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={adminSidebarMenu}
      title="Admin Portal"
      subtitle="Placement Management System"
      navbarTitle="Analytics"
      navbarSubtitle="View Analytics and Trends of Placement Activities"
    >
      <div className="space-y-8">
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

        <Charts
          title="Placement Trend"
          type="line"
          data={analytics?.placementTrend || []}
          xKey="month"
          dataKey="count"
        />
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
