export const calculateExperienceScore = (
  studentExperience,
  requiredExperience,
) => {
  if (!requiredExperience) return 100;

  if (!studentExperience?.length) return 40;

  return 100;
};

export const calculateEducationScore = (
  studentEducation,
  requiredEducation,
) => {
  if (!requiredEducation) return 100;

  if (!studentEducation?.length) return 40;

  return 100;
};
