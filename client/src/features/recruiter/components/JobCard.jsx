import {
  MapPin,
  Briefcase,
  IndianRupee,
  CalendarDays,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

const JobCard = ({ job, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-700";

      case "closed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const salaryText =
    job.salaryRange?.min || job.salaryRange?.max
      ? `₹${job.salaryRange?.min || 0} - ₹${job.salaryRange?.max || 0}`
      : "Not Disclosed";

  return (
    <div
      className="
        bg-white
    rounded-3xl
    border
    border-slate-200
    shadow-sm
    hover:shadow-xl
    hover:-translate-y-1
    transition-all
    duration-300
    p-6
      "
    >
      {/* Header */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="
        w-14
        h-14
        rounded-2xl
        overflow-hidden
        border
        bg-slate-100
        flex
        items-center
        justify-center
        shrink-0
      "
          >
            {job.recruiter?.companyLogo?.url ? (
              <img
                src={job.recruiter.companyLogo.url}
                alt={job.recruiter.companyName}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-lg font-bold text-slate-500">
                {job.recruiter?.companyName?.charAt(0)?.toUpperCase() || "C"}
              </span>
            )}
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800">{job.title}</h3>

            <p className="text-slate-500 font-medium mt-1">
              {job.recruiter?.companyName}
            </p>
          </div>
        </div>

        <span
          className={`
      px-3
      py-1
      rounded-full
      text-xs
      font-semibold
      capitalize
      ${getStatusColor(job.status)}
    `}
        >
          {job.status}
        </span>
      </div>

      {/* Details */}

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-slate-600">
          <MapPin size={18} />
          <span>{job.location || "Not Specified"}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Briefcase size={18} />
          <span className="capitalize">{job.jobType?.replace("_", " ")}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <IndianRupee size={18} />
          <span>{salaryText}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Eye size={18} />
          <span className="capitalize">{job.visibility}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <CalendarDays size={18} />

          <span>
            Apply Before:{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Skills */}

      <div className="flex flex-wrap gap-2 mt-5">
        {job.requiredSkills.slice(0, 5).map((skill) => (
          <span
            key={skill}
            className="
        px-3
        py-1
        text-xs
        font-medium
        rounded-full
        bg-indigo-100
        text-indigo-700
      "
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Description */}

      <div className="mt-5">
        <p
          className="
            text-sm
            text-slate-600
            line-clamp-3
          "
        >
          {job.description}
        </p>
      </div>

      {/* Eligibility */}

      {job.eligibilityCriteria?.minCGPA && (
        <div className="mt-4 text-sm text-slate-500">
          Minimum CGPA:{" "}
          <span className="font-medium">{job.eligibilityCriteria.minCGPA}</span>
        </div>
      )}

      {/* Footer */}

      <div
        className="
          flex
          justify-end
          gap-3
          mt-6
          pt-5
          border-t
        "
      >
        <button
          onClick={() => onEdit(job)}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-indigo-50
            text-indigo-600
            hover:bg-indigo-100
            transition
          "
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(job._id)}
          className="
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            bg-red-50
            text-red-600
            hover:bg-red-100
            transition
          "
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
