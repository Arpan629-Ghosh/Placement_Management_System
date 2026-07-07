import calculateSkillMatch from "./scoreCalculator.js";
/*
|--------------------------------------------------------------------------
| Score Configuration
|--------------------------------------------------------------------------
*/

const SCORE_WEIGHT = {
  SKILL: 0.7,
  PROJECT: 0.2,
  RESUME: 0.1,
};

/*
|--------------------------------------------------------------------------
| Project Relevance Score
|--------------------------------------------------------------------------
*/

const calculateProjectScore = (projects = [], requiredSkills = []) => {
  if (!projects.length || !requiredSkills.length) return 0;

  let matchedSkills = 0;

  projects.forEach((project) => {
    if (!project?.technologies?.length) return;

    project.technologies.forEach((tech) => {
      const exists = requiredSkills.some(
        (skill) => skill.toLowerCase().trim() === tech.toLowerCase().trim(),
      );

      if (exists) matchedSkills++;
    });
  });

  return Math.min(100, matchedSkills * 20);
};

/*
|--------------------------------------------------------------------------
| AI Explanation Generator
|--------------------------------------------------------------------------
*/

const generateReason = (score, matchedSkills, missingSkills) => {
  if (score >= 90) {
    return "Excellent technical match. Candidate satisfies almost all required skills.";
  }

  if (score >= 80) {
    return "Strong candidate with good technical alignment.";
  }

  if (score >= 70) {
    return "Good candidate. Missing a few preferred skills.";
  }

  if (score >= 60) {
    return "Average fit. Additional upskilling recommended.";
  }

  return "Weak fit for this position.";
};

/*
|--------------------------------------------------------------------------
| Candidate Ranking
|--------------------------------------------------------------------------
*/

export const rankCandidates = (applicants = [], jobAnalysis) => {
  const rankedCandidates = applicants.map((student) => {
    const resume = student.resumeAnalysis;

    /*
    ---------------------------------------------------
    Skill Match
    ---------------------------------------------------
    */

    const skillResult = calculateSkillMatch(
      resume?.skills || [],
      jobAnalysis?.extractedSkills || [],
    );

    /*
    ---------------------------------------------------
    Project Match
    ---------------------------------------------------
    */

    const projectScore = calculateProjectScore(
      resume?.projects || [],
      jobAnalysis?.extractedSkills || [],
    );

    /*
    ---------------------------------------------------
    Resume Score
    ---------------------------------------------------
    */

    const resumeScore = resume?.resumeScore || 0;

    /*
    ---------------------------------------------------
    Final Score
    ---------------------------------------------------
    */

    const finalScore = Math.round(
      skillResult.score * SCORE_WEIGHT.SKILL +
        projectScore * SCORE_WEIGHT.PROJECT +
        resumeScore * SCORE_WEIGHT.RESUME,
    );

    return {
      student,

      score: finalScore,

      matchedSkills: skillResult.matchedSkills,

      missingSkills: skillResult.missingSkills,

      projectScore,

      resumeScore,

      reason: generateReason(
        finalScore,
        skillResult.matchedSkills,
        skillResult.missingSkills,
      ),
    };
  });

  /*
  -------------------------------------------------------
  Sort Descending
  -------------------------------------------------------
  */

  rankedCandidates.sort((a, b) => b.score - a.score);

  /*
  -------------------------------------------------------
  Assign Rank
  -------------------------------------------------------
  */

  rankedCandidates.forEach((candidate, index) => {
    candidate.rank = index + 1;
  });

  return rankedCandidates;
};
