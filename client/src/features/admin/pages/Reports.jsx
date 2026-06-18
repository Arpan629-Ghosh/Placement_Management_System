import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { generateReport, getReports } from "../adminThunks";

import { adminSidebarMenu } from "../constants/adminSidebarMenu";

import { Users, UserCheck, Briefcase, FileText } from "lucide-react";

import ReportCard from "../components/ReportCard";
import ReportTable from "../components/ReportTable";

const ReportsPage = () => {
  const dispatch = useDispatch();

  const { reports, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getReports());
  }, [dispatch]);

  const handleGenerate = async () => {
    await dispatch(generateReport());

    dispatch(getReports());
  };

  const latestReport = reports?.[0];

  return (
    <Layout
      sidebarMenu={adminSidebarMenu}
      title="Admin Portal"
      subtitle="Placement Management System"
      navbarTitle="Reports Management"
      navbarSubtitle="Generate snapshots of PMS statistics."
      userName="Admin"
      department="Placement Cell"
    >
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Generate Report
          </button>
        </div>

        {loading && !reports?.length ? (
          <Loader text="Loading Reports..." />
        ) : (
          <>
            {/* Latest Report Summary */}

            {latestReport && (
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
                  title="Students"
                  value={latestReport.totalStudents}
                  icon={Users}
                />

                <ReportCard
                  title="Recruiters"
                  value={latestReport.totalRecruiters}
                  icon={UserCheck}
                />

                <ReportCard
                  title="Jobs"
                  value={latestReport.totalJobs}
                  icon={Briefcase}
                />

                <ReportCard
                  title="Applications"
                  value={latestReport.totalApplications}
                  icon={FileText}
                />
              </div>
            )}

            {/* Extra Stats */}

            {latestReport && (
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-6
                "
              >
                <div
                  className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                  "
                >
                  <h3 className="font-semibold">Active Jobs</h3>

                  <p className="text-4xl font-bold mt-4 text-green-600">
                    {latestReport.activeJobs}
                  </p>
                </div>

                <div
                  className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                  "
                >
                  <h3 className="font-semibold">Pending Applications</h3>

                  <p className="text-4xl font-bold mt-4 text-orange-600">
                    {latestReport.pendingApplications}
                  </p>
                </div>

                <div
                  className="
                    bg-white
                    border
                    rounded-3xl
                    p-6
                  "
                >
                  <h3 className="font-semibold">Placed Students</h3>

                  <p className="text-4xl font-bold mt-4 text-indigo-600">
                    {latestReport.placedStudents}
                  </p>
                </div>
              </div>
            )}

            {/* Reports History */}

            <ReportTable reports={reports} />
          </>
        )}
      </div>
    </Layout>
  );
};

export default ReportsPage;
