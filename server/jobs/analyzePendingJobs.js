import Job from "../models/Job.js";
import { analyzeJob } from "../ai/job.service.js";

export const analyzePendingJobs = async () => {
  const jobs = await Job.find({
    pendingAnalysis: true,
    "jobAnalysis.aiStatus": {
      $in: ["pending", "failed"],
    },
  });

  for (const job of jobs) {
    try {
      const analysis = await analyzeJob({
        title: job.title,
        description: job.description,
        requirements: job.requiredSkills,
      });

      job.jobAnalysis = {
        ...analysis,
        aiStatus: "completed",
        analyzedAt: new Date(),
      };

      job.pendingAnalysis = false;

      await job.save();

      console.log("✅ Analyzed:", job.title);
    } catch (err) {
      console.log("⏳ Still pending:", job.title);
      job.jobAnalysis = {
        aiStatus: "failed",
      };

      job.pendingAnalysis = true;
      await job.save();
    }
  }
};
