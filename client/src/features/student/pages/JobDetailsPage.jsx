import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import ApplyJobModal from "../components/ApplyJobModal";

import { studentSidebarMenu } from "../constants/SidebarMenu";

import { getJobDetails, applyForJob } from "../studentThunks";
import { toast } from "react-toastify";

const JobDetailsPage = () => {
  const { jobId } = useParams();

  const dispatch = useDispatch();

  const { jobDetails, loading, jobDetailsLoading, profile } = useSelector(
    (state) => state.student,
  );

  const [applyModalOpen, setApplyModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getJobDetails(jobId));
  }, [dispatch, jobId]);

  if (jobDetailsLoading || !jobDetails) {
    return (
      <Layout sidebarMenu={studentSidebarMenu}>
        <Loader text="Loading Job..." />
      </Layout>
    );
  }

  const salaryText =
    jobDetails.salaryRange?.min || jobDetails.salaryRange?.max
      ? `₹${jobDetails.salaryRange?.min?.toLocaleString()} - ₹${jobDetails.salaryRange?.max?.toLocaleString()}`
      : "Not Disclosed";

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Job Details"
      navbarSubtitle="Opportunity Details"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <div
        className="
          bg-white
          rounded-3xl
          border
          p-8
          shadow-sm
        "
      >
        {/* Header */}

        <div className="flex items-center gap-5">
          <img
            src={
              jobDetails.recruiter?.companyLogo?.url ||
              jobDetails.companyLogo ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                jobDetails.companyName ||
                  jobDetails.recruiter?.companyName ||
                  "Company",
              )}`
            }
            alt={jobDetails.companyName || jobDetails.recruiter?.companyName}
            className="
              w-20
              h-20
              rounded-2xl
              border
            "
          />

          <div>
            <h1 className="text-3xl font-bold">{jobDetails.title}</h1>

            <p className="text-slate-500">
              {jobDetails.companyName || jobDetails.recruiter?.companyName}
            </p>
          </div>
        </div>

        {/* Details */}

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Location</h3>

            <p>{jobDetails.location}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Salary</h3>

            <p>{salaryText}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Job Type</h3>

            <p>{jobDetails.jobType?.replaceAll("_", " ")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Apply Before</h3>

            <p>
              {new Date(jobDetails.applicationDeadline).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Description */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>

          <p className="text-slate-600 leading-7">{jobDetails.description}</p>
        </div>

        {/* Website */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Company Website</h2>

          <a
            href={jobDetails.recruiter?.companyWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 leading-7"
          >
            {jobDetails.recruiter?.companyWebsite}
          </a>
        </div>

        {/* Skills */}

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Required Skills</h2>

          <div className="flex flex-wrap gap-2">
            {jobDetails.requiredSkills?.map((skill) => (
              <span
                key={skill}
                className="
                    px-4
                    py-2
                    bg-indigo-50
                    text-indigo-700
                    rounded-full
                  "
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply */}

        <div className="mt-10">
          <button
            onClick={() => setApplyModalOpen(true)}
            className="
              bg-indigo-600
              text-white
              px-8
              py-3
              rounded-xl
              font-semibold
            "
          >
            Apply Now
          </button>
        </div>
      </div>

      <ApplyJobModal
        open={applyModalOpen}
        job={jobDetails}
        hasResume={!!profile?.resume}
        loading={loading}
        onClose={() => setApplyModalOpen(false)}
        onConfirm={async () => {
          const res = await dispatch(applyForJob(jobDetails._id));

          if (res.meta.requestStatus === "fulfilled") {
            toast.success(res.payload.message);

            setApplyModalOpen(false);
          } else {
            toast.error(res.payload?.message || "Failed to apply");
            setApplyModalOpen(false);
          }
        }}
      />
    </Layout>
  );
};

export default JobDetailsPage;
