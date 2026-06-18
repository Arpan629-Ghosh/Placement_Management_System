import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Layout from "@/components/common/Layout";
import Loader from "@/components/ui/Loader";

import CandidateInfoCard from "../components/CandidateInfoCard";
import ResumeViewerCard from "../components/ResumeViewerCard";
import ApplicationTimeline from "../components/ApplicationTimeline";
import RecruiterActionPanel from "../components/RecruiterActionPanel";

import StatusUpdateModal from "../components/StatusUpdateModal";
import ScheduleInterviewModal from "../components/ScheduleInterviewModal";

import { recruiterSidebarMenu } from "../constants/SidebarMenu";

import { getRecruiterApplicationDetails } from "../recruiterThunks";

const RecruiterApplicationDetailsPage = () => {
  const dispatch = useDispatch();

  const { applicationId } = useParams();

  const { applicationDetails, loading, profile } = useSelector(
    (state) => state.recruiter,
  );

  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);

  console.log("Application Details:", applicationDetails);

  useEffect(() => {
    dispatch(getRecruiterApplicationDetails(applicationId));
  }, [dispatch, applicationId]);

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="Application Details"
      navbarSubtitle="Candidate Review"
      userName={profile?.user?.name}
      department={profile?.companyName}
      profilePicture={profile?.companyLogo?.url}
    >
      {loading || !applicationDetails ? (
        <Loader text="Loading Application..." />
      ) : (
        <div className="space-y-8">
          <RecruiterActionPanel
            application={applicationDetails}
            onStatusUpdate={() => setStatusModalOpen(true)}
            onScheduleInterview={() => setInterviewModalOpen(true)}
          />

          <div className="grid xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-6">
              <CandidateInfoCard application={applicationDetails} />

              <ApplicationTimeline application={applicationDetails} />

              <ResumeViewerCard resume={applicationDetails.resumeSnapshot} />
            </div>

            <div>
              <div className="bg-white border rounded-3xl p-6">
                <h3 className="font-bold text-lg">Job Information</h3>

                <p className="mt-4 text-slate-600">
                  {applicationDetails.job?.title}
                </p>

                <p className="mt-2 text-slate-500">
                  {applicationDetails.job?.recruiter?.companyName}
                </p>
              </div>
            </div>
          </div>

          <StatusUpdateModal
            open={statusModalOpen}
            onClose={() => setStatusModalOpen(false)}
            applicationId={applicationId}
          />

          <ScheduleInterviewModal
            open={interviewModalOpen}
            onClose={() => setInterviewModalOpen(false)}
            applicationId={applicationId}
          />
        </div>
      )}
    </Layout>
  );
};

export default RecruiterApplicationDetailsPage;
