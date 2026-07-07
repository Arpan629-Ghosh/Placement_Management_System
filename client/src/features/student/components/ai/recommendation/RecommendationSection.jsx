import SectionHeader from "../resumeAnalysis/SectionHeader";
import RecommendationCard from "./RecommendationCard";
import { motion } from "framer-motion";

const RecommendationSection = ({
  title,
  description,
  recommendations = [],
}) => {
  if (!recommendations.length) return null;

  return (
    <section className="space-y-6">
      <SectionHeader title={title} subtitle={description} />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3 flex-row"
      >
        {recommendations.map((recommendation) => (
          <RecommendationCard
            key={recommendation.job._id}
            recommendation={recommendation}
          />
        ))}
      </motion.div>
    </section>
  );
};

export default RecommendationSection;
