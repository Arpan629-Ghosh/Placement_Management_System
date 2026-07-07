import SectionHeader from "./SectionHeader";
import { GraduationCap } from "lucide-react";

const ResumeEducation = ({ education = [] }) => {
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
        title="Education"
        subtitle="Educational qualifications"
        count={education.length}
      />

      <div className="space-y-6">
        {education.map((item) => (
          <div
            key={item._id}
            className="
                        flex
                        gap-5
                        "
          >
            <div
              className="
                            h-12
                            w-12
                            rounded-xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            "
            >
              <GraduationCap className="text-blue-600" />
            </div>

            <div>
              <h3 className="font-bold">{item.degree}</h3>

              <p className="text-slate-600">{item.institution}</p>

              <p className="text-sm text-slate-400">{item.dates}</p>

              <p className="text-indigo-600 mt-2">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeEducation;
