import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/layout/EmptyState";
import Pagination from "@/components/ui/Pagination";

import { studentSidebarMenu } from "../constants/SidebarMenu";

import ApplicationsCard from "../components/ApplicationsCard";
import ApplicationFilters from "../components/ApplicationFilters";
import ApplicationStats from "../components/ApplicationStats";

import { getApplications } from "../studentThunks";

const ApplicationsPage = () => {
  const dispatch = useDispatch();

  const {
    profile,

    applications,

    applicationsLoading,

    applicationPagination,
  } = useSelector((state) => state.student);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("latest");

  // ============================
  // Fetch Applications
  // ============================

  useEffect(() => {
    dispatch(
      getApplications({
        page,
        limit: 10,
      }),
    );
  }, [dispatch, page]);

  // ============================
  // Filters
  // ============================

  const filteredApplications = useMemo(() => {
    let data = [...applications];

    // Status Filter

    if (statusFilter !== "all") {
      data = data.filter((application) => application.status === statusFilter);
    }

    // Search

    if (search.trim()) {
      const keyword = search.toLowerCase();

      data = data.filter(
        (application) =>
          application.job?.title?.toLowerCase().includes(keyword) ||
          application.job?.recruiter?.companyName
            ?.toLowerCase()
            .includes(keyword),
      );
    }

    // Sorting

    switch (sortBy) {
      case "latest":
        data.sort(
          (a, b) =>
            new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime(),
        );
        break;

      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.appliedAt).getTime() - new Date(b.appliedAt).getTime(),
        );
        break;

      case "company":
        data.sort((a, b) =>
          (a.job?.recruiter?.companyName || "").localeCompare(
            b.job?.recruiter?.companyName || "",
          ),
        );
        break;

      case "status":
        data.sort((a, b) => (a.status || "").localeCompare(b.status || ""));
        break;

      default:
        break;
    }

    return data;
  }, [applications, search, statusFilter, sortBy]);

  // ============================
  // First Load Loader
  // ============================

  if (applicationsLoading && applications.length === 0) {
    return (
      <Layout
        sidebarMenu={studentSidebarMenu}
        navbarTitle="My Applications"
        navbarSubtitle="Track your job applications"
        userName={profile?.user?.name}
        department={profile?.department}
        profilePicture={profile?.profilePicture?.url}
      >
        <Loader text="Loading Applications..." />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="My Applications"
      navbarSubtitle="Track your job applications"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <div className="space-y-8">
        {/* Stats */}

        <ApplicationStats applications={applications} />

        {/* Filters */}

        <ApplicationFilters
          searchTerm={search}
          setSearchTerm={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Pagination Loading Indicator */}

        {applicationsLoading && applications.length > 0 && (
          <div className="flex justify-center">
            <p className="text-sm text-slate-500">Loading applications...</p>
          </div>
        )}

        {/* Empty State */}

        {filteredApplications.length === 0 ? (
          <EmptyState
            title="No Applications Found"
            description={
              search || statusFilter !== "all"
                ? "No applications match your current filters."
                : "You haven't applied to any jobs yet."
            }
          />
        ) : (
          <>
            {/* Applications Grid */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
              "
            >
              {filteredApplications.map((application) => (
                <ApplicationsCard
                  key={application._id}
                  application={application}
                />
              ))}
            </div>

            {/* Pagination */}

            {applicationPagination.totalPages > 1 && (
              <Pagination
                currentPage={applicationPagination.page}
                totalPages={applicationPagination.totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ApplicationsPage;
