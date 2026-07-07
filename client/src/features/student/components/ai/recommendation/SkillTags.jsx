const SkillTags = ({ skills = [] }) => {
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
          bg-green-100
          text-green-700
          "
        >
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillTags;
