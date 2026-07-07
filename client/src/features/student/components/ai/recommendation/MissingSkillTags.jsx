const MissingSkillTags = ({ skills = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <span
          key={skill}
          className="
          px-3
          py-1
          rounded-full
          text-xs
          font-medium
          bg-red-100
          text-red-700
          "
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default MissingSkillTags;
