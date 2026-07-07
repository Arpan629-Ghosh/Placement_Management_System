const calculateSkillMatch = (studentSkills = [], jobSkills = []) => {
  if (!jobSkills.length) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: [],
    };
  }

  const student = studentSkills.map((s) => s.toLowerCase());

  const matchedSkills = jobSkills.filter((skill) =>
    student.includes(skill.toLowerCase()),
  );

  const missingSkills = jobSkills.filter(
    (skill) => !student.includes(skill.toLowerCase()),
  );

  const score = Math.round((matchedSkills.length / jobSkills.length) * 100);

  return {
    score,
    matchedSkills,
    missingSkills,
  };
};

export default calculateSkillMatch;
