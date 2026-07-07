import SectionHeader from "./SectionHeader";
import SkillChip from "./SkillChip";

const ResumeSkills = ({ skills = [] }) => {
  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-md
        border
        p-7
        "
    >
      <SectionHeader
        title="Detected Skills"
        subtitle="Technical & Professional skills extracted by AI"
        count={skills.length}
      />

      <div
        className="
            flex
            flex-wrap
            gap-3
            "
      >
        {skills.map((skill) => (
          <SkillChip key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
};

export default ResumeSkills;
