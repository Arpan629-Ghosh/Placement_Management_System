import { CheckCircle2 } from "lucide-react";

const SkillChip = ({ skill }) => {
  return (
    <div
      className="
inline-flex
items-center
gap-2
px-4
py-2
rounded-full
bg-gradient-to-r
from-indigo-100
to-blue-100
text-indigo-700
font-medium
hover:scale-105
transition
"
    >
      <CheckCircle2 className="w-4 h-4" />

      {skill}
    </div>
  );
};

export default SkillChip;
