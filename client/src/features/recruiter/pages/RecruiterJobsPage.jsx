import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { getRecruiterJobs, deleteJob } from "../recruiterThunks";

import { recruiterSidebarMenu } from "../constants/sidebarMenu";

import JobCard from "../components/JobCard";
import JobFormModal from "../components/JobFormModal";

const RecruiterJobsPage = () => {
  const dispatch = useDispatch();

  const { profile, jobs, jobsLoading } = useSelector(
    (state) => state.recruiter,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedJob, setSelectedJob] = useState(null);
  // console.log("JobsPage");

  useEffect(() => {
    dispatch(getRecruiterJobs());
  }, [dispatch]);

  const handleCreateJob = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmDelete) return;

    await dispatch(deleteJob(jobId));
  };

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Jobs"
      navbarSubtitle="Manage your company jobs"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="space-y-8">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Job Management</h1>

            <p className="text-slate-500 mt-2">
              Create, update and manage job postings.
            </p>
          </div>

          <button
            onClick={handleCreateJob}
            className="
              bg-indigo-600
              text-white
              px-5
              py-3
              rounded-xl
              hover:bg-indigo-700
            "
          >
            Create Job
          </button>
        </div>

        {/* Loader */}

        {jobsLoading && jobs.length === 0 ? (
          <Loader text="Loading jobs..." />
        ) : (
          <>
            {jobs?.length > 0 ? (
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  xl:grid-cols-3
                  gap-6
                "
              >
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={handleEditJob}
                    onDelete={handleDeleteJob}
                  />
                ))}
              </div>
            ) : (
              <div
                className="
                  bg-white
                  border
                  rounded-3xl
                  p-16
                  text-center
                "
              >
                <h2 className="text-2xl font-semibold">No Jobs Posted Yet</h2>

                <p className="text-slate-500 mt-3">
                  Create your first job posting to start receiving applications.
                </p>

                <button
                  onClick={handleCreateJob}
                  className="
                    mt-6
                    bg-indigo-600
                    text-white
                    px-5
                    py-3
                    rounded-xl
                  "
                >
                  Create First Job
                </button>
              </div>
            )}
          </>
        )}

        {/* Create/Edit Modal */}

        <JobFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedJob(null);
          }}
          editJob={selectedJob}
        />
      </div>
    </Layout>
  );
};

export default RecruiterJobsPage;
