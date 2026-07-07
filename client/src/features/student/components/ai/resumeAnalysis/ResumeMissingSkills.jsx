import { AlertTriangle } from "lucide-react";
import SectionHeader from "./SectionHeader";

const ResumeMissingSkills = ({ skills = [] }) => {
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
        title="Missing Skills"
        subtitle="Important skills that can improve your resume"
        count={skills.length}
      />

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <div
            key={skill}
            className="
                        flex
                        items-center
                        gap-2
                        bg-red-50
                        text-red-600
                        px-4
                        py-2
                        rounded-full
                        "
          >
            <AlertTriangle size={16} />

            {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeMissingSkills;
