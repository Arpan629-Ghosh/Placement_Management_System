import { MapPin, IndianRupee, CalendarDays, ArrowUpRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

const JobsCard = ({ job, onApply }) => {
  const navigate = useNavigate();

  const salaryText =
    job.salaryRange?.min || job.salaryRange?.max
      ? `₹${job.salaryRange?.min?.toLocaleString()} - ₹${job.salaryRange?.max?.toLocaleString()}`
      : "Not Disclosed";

  const companyName =
    job.recruiter?.companyName || job.companyName || "Unknown Company";

  const companyLogo =
    job.recruiter?.companyLogo?.url ||
    job.companyLogo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}`;

  const handleCardClick = () => {
    navigate(`/student/jobs/${job._id}`);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    onApply(job);
  };

  return (
    <div
      onClick={handleCardClick}
      className="
      group
      bg-white
      border
      border-slate-300
      rounded-3xl
      p-5
      cursor-pointer
      hover:shadow-2xl
      hover:border-indigo-500
      transition-all
      duration-300
      flex
      flex-col
      h-full
    "
    >
      {/* Header */}

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={companyLogo}
            alt={companyName}
            className="
          w-14
          h-14
          rounded-2xl
          object-cover
          border
          border-slate-200
          bg-white
          shrink-0
        "
          />

          <div className="min-w-0">
            <p className="text-xs text-slate-500 truncate">{companyName}</p>

            <h3
              className="
            text-lg
            font-bold
            text-slate-800
            line-clamp-2
          "
            >
              {job.title}
            </h3>
          </div>
        </div>

        <ArrowUpRight
          size={18}
          className="
        text-slate-400
        group-hover:text-indigo-600
        transition
        shrink-0
      "
        />
      </div>

      {/* Job Type */}

      <div className="mt-4">
        <span
          className="
        inline-flex
        px-3
        py-1
        rounded-full
        bg-indigo-50
        text-indigo-700
        text-xs
        font-medium
        capitalize
      "
        >
          {job.jobType?.replaceAll("_", " ")}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <IndianRupee size={16} />
          <span>{salaryText}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <CalendarDays size={16} />

          <span>
            Apply Before{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Skills */}

      {job.requiredSkills?.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {job.requiredSkills.slice(0, 3).map((skill) => (
            <span
              key={skill}
              className="
            px-3
            py-1
            rounded-full
            bg-slate-100
            text-slate-700
            text-xs
            font-medium
          "
            >
              {skill}
            </span>
          ))}

          {job.requiredSkills.length > 3 && (
            <span
              className="
            px-3
            py-1
            rounded-full
            bg-slate-100
            text-slate-700
            text-xs
            font-medium
          "
            >
              +{job.requiredSkills.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}

      <div className="mt-5 pt-4 border-t border-slate-100">
        <button
          onClick={handleApply}
          className="
        w-full
        py-3
        rounded-xl
        bg-indigo-600
        text-white
        font-medium
        hover:bg-indigo-700
        transition
      "
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobsCard;
