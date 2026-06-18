import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/layout/EmptyState";
import Pagination from "@/components/ui/Pagination";

import ApplicationStats from "../components/ApplicationStats";
import ApplicationFilters from "../components/ApplicationFilters";
import CandidateApplicationCard from "../components/CandidateApplicationCard";

import { recruiterSidebarMenu } from "../constants/SidebarMenu";

import { getAllApplications } from "../recruiterThunks";

const RecruiterApplicationsPage = () => {
  const dispatch = useDispatch();

  const { applications, applicationsLoading, profile } = useSelector(
    (state) => state.recruiter,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    if (!applications.length) {
      dispatch(getAllApplications());
    }
  }, [dispatch]);

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    if (statusFilter !== "all") {
      data = data.filter((application) => application.status === statusFilter);
    }

    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();

      data = data.filter(
        (application) =>
          application.student?.name?.toLowerCase().includes(keyword) ||
          application.student?.email?.toLowerCase().includes(keyword) ||
          application.job?.title?.toLowerCase().includes(keyword),
      );
    }

    switch (sortBy) {
      case "latest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "status":
        data.sort((a, b) => a.status.localeCompare(b.status));
        break;

      case "candidate":
        data.sort((a, b) => a.student?.name?.localeCompare(b.student?.name));
        break;

      case "job":
        data.sort((a, b) => a.job?.title?.localeCompare(b.job?.title));
        break;

      default:
        break;
    }

    return data;
  }, [applications, searchTerm, statusFilter, sortBy]);

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Applications"
      navbarSubtitle="Manage candidates"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="space-y-8">
        <ApplicationStats applications={applications} />

        <ApplicationFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {applicationsLoading ? (
          <Loader text="Loading Applications..." />
        ) : filteredApplications.length === 0 ? (
          <EmptyState
            title="No Applications Found"
            description="No candidate applications available."
          />
        ) : (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApplications.map((application) => (
                <CandidateApplicationCard
                  key={application._id}
                  application={application}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default RecruiterApplicationsPage;
