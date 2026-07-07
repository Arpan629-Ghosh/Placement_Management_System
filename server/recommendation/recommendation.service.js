import calculateSkillMatch from "./scoreCalculator.js";
import {
  calculateEducationScore,
  calculateExperienceScore,
} from "./recommendation.utils.js";

export const recommendJobs = (resumeAnalysis, jobs) => {
  const recommendations = jobs.map((job) => {
    const skillResult = calculateSkillMatch(
      resumeAnalysis.skills,
      job.jobAnalysis.extractedSkills,
    );

    const experienceScore = calculateExperienceScore(
      resumeAnalysis.experience,
      job.jobAnalysis.experienceLevel,
    );

    const educationScore = calculateEducationScore(
      resumeAnalysis.education,
      job.jobAnalysis.education,
    );

    const finalScore = Math.round(
      skillResult.score * 0.7 + experienceScore * 0.2 + educationScore * 0.1,
    );

    let priority = "Low";

    if (finalScore >= 85) priority = "Excellent";
    else if (finalScore >= 70) priority = "High";
    else if (finalScore >= 50) priority = "Medium";

    return {
      job,

      matchScore: finalScore,

      priority,

      matchedSkills: skillResult.matchedSkills,

      missingSkills: skillResult.missingSkills,

      reason: `Matched ${skillResult.matchedSkills.length} of ${job.jobAnalysis.extractedSkills.length} required skills.`,

      breakdown: {
        skills: skillResult.score,
        experience: experienceScore,
        education: educationScore,
      },
    };
  });

  recommendations.sort((a, b) => b.matchScore - a.matchScore);

  return recommendations;
};
