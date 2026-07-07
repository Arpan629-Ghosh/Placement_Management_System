import { motion } from "framer-motion";
import studentDashboard from "@/assets/screenshots/student-dashboard.png";
import recruiterDashboard from "@/assets/screenshots/recruiter-dashboard.png";
import adminDashboard from "@/assets/screenshots/admin-dashboard.png";

const features = [
  {
    title: "Student Dashboard",
    subtitle: "Everything students need for placements in one place.",
    image: studentDashboard,
    points: [
      "Real-time job notifications",
      "Profile completion tracking",
      "Resume upload & management",
      "Application history",
      "Interview status tracking",
      "AI-powered resume analysis",
      "Smart job recommendation",
    ],
  },
  {
    title: "Recruiter Dashboard",
    subtitle: "Powerful hiring tools for recruiters.",
    image: recruiterDashboard, // Replace with actual image import
    points: [
      "Create job openings",
      "Manage applicants",
      "Shortlist candidates",
      "Interview scheduling",
      "Offer management",
      "AI-powered candidate ranking",
    ],
  },
  {
    title: "Admin Control Panel",
    subtitle: "Complete control over the placement ecosystem.",
    image: adminDashboard, // Replace with actual image import
    points: [
      "User management",
      "Placement analytics",
      "Recruiter approval",
      "Report Generating",
      "Statistical analysis",
    ],
  },
];

const ProductFeatures = () => {
  return (
    <section className="py-28 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-5xl font-bold mb-5">
          Everything You Need For
          <span className="text-blue-400"> Modern Placements</span>
        </h2>

        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          PMS is built to simplify every stage of the campus recruitment
          process—from student preparation to recruiter hiring and institutional
          management.
        </p>
      </motion.div>

      <div className="space-y-32">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`grid lg:grid-cols-2 gap-20 items-center ${
              index % 2 !== 0 ? "lg:grid-flow-dense" : ""
            }`}
          >
            <div className={`${index % 2 !== 0 ? "lg:col-start-2" : ""}`}>
              <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                {/* Replace with your screenshot */}

                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full hover:scale-105 transition duration-700"
                />
              </div>
            </div>

            <div className={`${index % 2 !== 0 ? "lg:col-start-1" : ""}`}>
              <p className="text-blue-400 font-semibold uppercase tracking-wider mb-2">
                PRODUCT FEATURE
              </p>

              <h3 className="text-4xl font-bold mb-5">{feature.title}</h3>

              <p className="text-gray-400 text-lg mb-8 leading-8">
                {feature.subtitle}
              </p>

              <div className="space-y-4">
                {feature.points.map((point) => (
                  <motion.div
                    key={point}
                    whileHover={{
                      x: 10,
                    }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-3 h-3 rounded-full bg-blue-400" />

                    <span className="text-gray-300">{point}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductFeatures;
