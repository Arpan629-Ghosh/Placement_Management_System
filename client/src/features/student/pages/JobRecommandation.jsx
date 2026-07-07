import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import Layout from "@/components/common/Layout";

import RecommendationSummary from "../components/ai/recommendation/RecommendationSummary";
import RecommendationSection from "../components/ai/recommendation/RecommendationSection";
import RecommendationSkeleton from "../components/ai/recommendation/RecommendationSkeleton";
import RecommendationEmpty from "../components/ai/recommendation/RecommendationEmpty";
import AIInsightBanner from "../components/ai/recommendation/AIInsightBanner";

import { studentSidebarMenu } from "../constants/SidebarMenu";
import { getRecommendedJobs } from "../studentThunks";

const JobRecommendation = () => {
  const dispatch = useDispatch();

  const { profile, recommendedJobs, recommendedJobsLoading } = useSelector(
    (state) => state.student,
  );

  useEffect(() => {
    dispatch(getRecommendedJobs());
  }, [dispatch]);

  const excellentJobs = useMemo(
    () => recommendedJobs?.filter((job) => job.priority === "Excellent") || [],
    [recommendedJobs],
  );

  console.log("excellent:", excellentJobs);

  const highJobs = useMemo(
    () => recommendedJobs?.filter((job) => job.priority === "High") || [],
    [recommendedJobs],
  );

  console.log("high :", highJobs);

  const mediumJobs = useMemo(
    () => recommendedJobs?.filter((job) => job.priority === "Medium") || [],
    [recommendedJobs],
  );

  console.log("medium:", mediumJobs);

  if (recommendedJobsLoading) {
    return (
      <Layout
        sidebarMenu={studentSidebarMenu}
        navbarTitle="AI Job Recommendations"
        navbarSubtitle="Smart career opportunities tailored for you"
        userName={profile?.user?.name}
        department={profile?.department}
        profilePicture={profile?.profilePicture?.url}
      >
        <RecommendationSkeleton />
      </Layout>
    );
  }

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="AI Job Recommendations"
      navbarSubtitle="Discover opportunities ranked by AI based on your resume."
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      {!recommendedJobs?.length ? (
        <RecommendationEmpty />
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="space-y-8"
        >
          <AIInsightBanner recommendations={recommendedJobs} />

          <RecommendationSummary recommendations={recommendedJobs} />

          <RecommendationSection
            title="Excellent Matches"
            description="You're highly qualified for these opportunities."
            recommendations={excellentJobs}
          />

          <RecommendationSection
            title="High Matches"
            description="Strong fit with a few skills to improve."
            recommendations={highJobs}
          />

          <RecommendationSection
            title="Medium Matches"
            description="Good opportunities to grow into."
            recommendations={mediumJobs}
          />
        </motion.div>
      )}
    </Layout>
  );
};

export default JobRecommendation;
