import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Layout from "@/components/common/Layout";
import ResumeScoreCard from "../components/ai/resumeAnalysis/ResumeScoreCard";
import ResumeOverviewCards from "../components/ai/resumeAnalysis/ResumeOverviewCards";
import ResumeSkills from "../components/ai/resumeAnalysis/ResumeSkills";
import ResumeMissingSkills from "../components/ai/resumeAnalysis/ResumeMissingSkills";
import ResumeProjects from "../components/ai/resumeAnalysis/ResumeProjects";
import ResumeEducation from "../components/ai/resumeAnalysis/ResumeEducation";
import ResumeExperience from "../components/ai/resumeAnalysis/ResumeExperience";
import ResumeStrengths from "../components/ai/resumeAnalysis/ResumeStrengths";
import ResumeWeaknesses from "../components/ai/resumeAnalysis/ResumeWeaknesses";
import ResumeSuggestions from "../components/ai/resumeAnalysis/ResumeSuggestions";
import ResumeLoadingSkeleton from "../components/ai/resumeAnalysis/ResumeLoadingSkeleton";
import ResumeEmptyState from "../components/ai/resumeAnalysis/ResumeEmptyState";
import { studentSidebarMenu } from "../constants/SidebarMenu";

const ResumeAnalysis = () => {
  const { profile, resumeUploadLoading } = useSelector(
    (state) => state.student,
  );

  const analysis = profile?.resumeAnalysis;

  if (resumeUploadLoading) {
    return <ResumeLoadingSkeleton />;
  }

  if (!analysis) {
    return <ResumeEmptyState />;
  }

  return (
    <Layout
      sidebarMenu={studentSidebarMenu}
      navbarTitle="Resume Intelligence"
      navbarSubtitle="Get insights about your resume and improve your chances of getting hired"
      userName={profile?.user?.name}
      department={profile?.department}
      profilePicture={profile?.profilePicture?.url}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="space-y-8"
      >
        {/* AI Score */}
        <ResumeScoreCard analysis={analysis} />

        {/* Overview */}
        <ResumeOverviewCards analysis={analysis} />

        {/* Strengths */}
        <ResumeStrengths strengths={analysis.strengths} />

        {/* Skills */}
        <ResumeSkills skills={analysis.skills} />

        {/* Missing Skills */}
        <ResumeMissingSkills skills={analysis.missingSkills} />

        {/* Projects */}
        <ResumeProjects projects={analysis.projects} />

        {/* Education */}
        <ResumeEducation education={analysis.education} />

        {/* Experience */}
        <ResumeExperience experience={analysis.experience} />

        {/* Weaknesses */}
        <ResumeWeaknesses weaknesses={analysis.weaknesses} />

        {/* Suggestions */}
        <ResumeSuggestions suggestions={analysis.suggestions} />
      </motion.div>
    </Layout>
  );
};

export default ResumeAnalysis;
