import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";
import SearchBar from "@/components/common/inputs/SearchBar";

import JobsCard from "../components/JobsCard";
import ApplyJobModal from "../components/ApplyJobModal";
import Pagination from "@/components/ui/Pagination";

import { studentSidebarMenu } from "../constants/SidebarMenu";

import { getJobs, applyForJob } from "../studentThunks";

const JobsPage = () => {
  const dispatch = useDispatch();

  const { jobs, loading, profile, jobPagination } = useSelector(
    (state) => state.student,
  );

  const [search, setSearch] = useState("");
  const [jobType, setJobType] = useState("");
  const [location, setLocation] = useState("");
  const [sort, setSort] = useState("latest");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);

  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    fetchJobs(1);
  }, [debouncedSearch, jobType, location, sort]);

  const fetchJobs = (page = 1) => {
    dispatch(
      getJobs({
        page,
        limit: 10,
        search: debouncedSearch,
        jobType,
        location,
        sort,
      }),
    );
  };

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Available Jobs"
      navbarSubtitle="Explore and apply for jobs"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <div className="space-y-6">
        {/* Header */}

        {/* Filters */}

        <div className="grid md:grid-cols-5 gap-4">
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search jobs, skills..."
          />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="
      border
      rounded-xl
      px-4
      py-2
      bg-white
    "
          >
            <option value="">All Types</option>
            <option value="full_time">Full Time</option>
            <option value="internship">Internship</option>
            <option value="part_time">Part Time</option>
          </select>

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="
      border
      rounded-xl
      px-4
      py-2
    "
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="
      border
      rounded-xl
      px-4
      py-2
      bg-white
    "
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="deadline">Nearest Deadline</option>
            <option value="salary_high">Highest Salary</option>
            <option value="salary_low">Lowest Salary</option>
          </select>

          <button
            onClick={() => {
              setSearch("");
              setJobType("");
              setLocation("");
              setSort("latest");
            }}
            className="
      rounded-xl
      border
      bg-white
      hover:bg-slate-50
      px-4
      py-2
      font-medium
    "
          >
            Reset Filters
          </button>
        </div>

        {/* Jobs */}

        {loading ? (
          <Loader text="Loading Jobs..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobsCard
                key={job._id}
                job={job}
                onApply={(job) => {
                  setSelectedJob(job);
                  setApplyModalOpen(true);
                }}
              />
            ))}
          </div>
        )}

        {/* Pagination */}

        <Pagination
          currentPage={jobPagination.currentPage}
          totalPages={jobPagination.totalPages}
          onPageChange={fetchJobs}
        />

        {/* Apply Modal */}

        <ApplyJobModal
          open={applyModalOpen}
          job={selectedJob}
          hasResume={!!profile?.resume}
          loading={loading}
          onClose={() => {
            setApplyModalOpen(false);
            setSelectedJob(null);
          }}
          onConfirm={async () => {
            const res = await dispatch(applyForJob(selectedJob._id));

            if (res.meta.requestStatus === "fulfilled") {
              setApplyModalOpen(false);
            }
          }}
        />
      </div>
    </Layout>
  );
};

export default JobsPage;
