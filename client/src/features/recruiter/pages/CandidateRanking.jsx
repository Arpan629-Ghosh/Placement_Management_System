import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/common/Layout";

import CandidateRankingSummary from "../components/ai/candidateRanking/CandidateRankingSummary";
import CandidateRankingList from "../components/ai/candidateRanking/CandidateRankingList";
import CandidateRankingSkeleton from "../components/ai/candidateRanking/CandidateRankingSkeleton";
import CandidateRankingEmpty from "../components/ai/candidateRanking/CandidateRankingEmpty";

import { recruiterSidebarMenu } from "../constants/SidebarMenu";

import { getRecruiterJobs, getRankedApplicants } from "../recruiterThunks";

const CandidateRanking = () => {
  const dispatch = useDispatch();

  const [selectedJobId, setSelectedJobId] = useState("");

  const {
    profile,
    jobs,
    jobsLoading,

    rankedCandidates,
    rankedCandidatesLoading,
  } = useSelector((state) => state.recruiter);

  /*
  ============================================
  Load Recruiter's Jobs
  ============================================
  */

  useEffect(() => {
    dispatch(getRecruiterJobs());
  }, [dispatch]);

  /*
  ============================================
  Load Ranking
  ============================================
  */

  useEffect(() => {
    if (selectedJobId) {
      dispatch(getRankedApplicants(selectedJobId));
    }
  }, [dispatch, selectedJobId]);

  return (
    <Layout
      sidebarMenu={recruiterSidebarMenu}
      navbarTitle="AI Candidate Ranking"
      navbarSubtitle="Select a job to view AI ranked applicants."
      userName={profile?.user?.name}
      designation={profile?.designation}
      profilePicture={profile?.companyLogo?.url}
    >
      <div className="space-y-8">
        {/* ====================================== */}
        {/* Select Job */}
        {/* ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            p-6
          "
        >
          <label className="block text-sm font-semibold mb-3">Select Job</label>

          <select
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            disabled={jobsLoading}
            className="
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          >
            <option value="">Choose a Job...</option>

            {jobs?.map((job) => (
              <option key={job._id} value={job._id}>
                {job.title}
              </option>
            ))}
          </select>
        </motion.div>

        {/* ====================================== */}
        {/* Nothing Selected */}
        {/* ====================================== */}

        {!selectedJobId && (
          <CandidateRankingEmpty
            title="Select a Job"
            description="Choose one of your posted jobs to view AI-powered candidate ranking."
          />
        )}

        {/* ====================================== */}
        {/* Loading */}
        {/* ====================================== */}

        {selectedJobId && rankedCandidatesLoading && (
          <CandidateRankingSkeleton />
        )}

        {/* ====================================== */}
        {/* Empty */}
        {/* ====================================== */}

        {selectedJobId &&
          !rankedCandidatesLoading &&
          rankedCandidates?.length === 0 && (
            <CandidateRankingEmpty
              title="No Applicants Found"
              description="No analyzed applicants are available for this job yet."
            />
          )}

        {/* ====================================== */}
        {/* Ranking */}
        {/* ====================================== */}

        {selectedJobId &&
          !rankedCandidatesLoading &&
          rankedCandidates?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-8"
            >
              <CandidateRankingSummary candidates={rankedCandidates} />

              <CandidateRankingList candidates={rankedCandidates} />
            </motion.div>
          )}
      </div>
    </Layout>
  );
};

export default CandidateRanking;
