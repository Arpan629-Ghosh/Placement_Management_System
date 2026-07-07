import SectionHeader from "./SectionHeader";

const ResumeExperience = ({ experience = [] }) => {
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
        title="Experience"
        subtitle="Professional experience"
        count={experience.length}
      />

      {experience.length === 0 ? (
        <p className="text-slate-500">No professional experience found.</p>
      ) : (
        experience.map((exp) => <div key={exp._id}></div>)
      )}
    </div>
  );
};

export default ResumeExperience;
