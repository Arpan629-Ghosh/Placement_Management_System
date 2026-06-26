import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import { studentSidebarMenu } from "../constants/SidebarMenu";

import ApplicationTimeline from "../components/ApplicationTimeline";
import RecruiterInfoCard from "../components/RecruiterInfoCard";
import InterviewInfoCard from "../components/InterviewInfoCard";
import ResumeSnapshotCard from "../components/ResumeSnapshotCard";
import ApplicationStatusBadge from "../components/ApplicationStatusBadge";

import { getApplicationDetails } from "../studentThunks";

const ApplicationDetailsPage = () => {
  const dispatch = useDispatch();

  const { applicationId } = useParams();

  const { profile, applicationDetails, applicationsLoading } = useSelector(
    (state) => state.student,
  );

  useEffect(() => {
    dispatch(getApplicationDetails(applicationId));
  }, [dispatch, applicationId]);

  const {
    job,
    status,
    appliedAt,
    recruiterRemarks,
    coverLetter,
    interview,
    resumeSnapshot,
  } = applicationDetails || {};

  // console.log("snapshot", resumeSnapshot);

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Application Details"
      navbarSubtitle="Track application progress"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      {(applicationsLoading || !applicationDetails) && (
        <div className="py-10">
          <Loader text="Loading Application..." />
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            p-6
          "
        >
          <div className="flex items-start justify-between">
            <div>
              <h1
                className="
                  text-3xl
                  font-bold
                  text-slate-800
                "
              >
                {job?.title}
              </h1>

              <p
                className="
                  text-slate-500
                  mt-2
                "
              >
                {job?.recruiter?.companyName}
              </p>
            </div>

            <ApplicationStatusBadge status={status} />
          </div>
        </div>

        {/* Timeline */}

        <ApplicationTimeline
          status={status}
          appliedAt={appliedAt}
          interview={interview}
        />

        {/* Main Grid */}

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-3
            gap-6
          "
        >
          {/* Left */}

          <div className="xl:col-span-2 space-y-6">
            {/* Job Details */}

            <div
              className="
                bg-white
                rounded-3xl
                border
                p-6
              "
            >
              <h2
                className="
                  text-xl
                  font-bold
                  mb-4
                "
              >
                Job Information
              </h2>

              <div className="space-y-4">
                <p>{job?.description}</p>

                <div>
                  <h4 className="font-semibold">Required Skills</h4>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {job?.requiredSkills?.map((skill) => (
                      <span
                        key={skill}
                        className="
                            px-3
                            py-1
                            rounded-full
                            bg-indigo-50
                            text-indigo-700
                            text-xs
                          "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {recruiterRemarks && (
                  <div>
                    <h4 className="font-semibold">Recruiter Remarks</h4>

                    <p className="mt-2 text-slate-600">{recruiterRemarks}</p>
                  </div>
                )}

                {coverLetter && (
                  <div>
                    <h4 className="font-semibold">Cover Letter</h4>

                    <p className="mt-2 text-slate-600">{coverLetter}</p>
                  </div>
                )}
              </div>
            </div>

            <InterviewInfoCard interview={interview} />

            <ResumeSnapshotCard resume={resumeSnapshot} />
          </div>

          {/* Right */}

          <div>
            <RecruiterInfoCard recruiter={job?.recruiter} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicationDetailsPage;
