import { Building2, CalendarDays, ArrowUpRight } from "lucide-react";

import { useNavigate } from "react-router-dom";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

const ApplicationsCard = ({ application }) => {
  const navigate = useNavigate();

  const recruiter = application?.job?.recruiter;

  const companyName = recruiter?.companyName || "Unknown Company";

  const companyLogo =
    recruiter?.companyLogo?.url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}`;

  const appliedDate = new Date(application.appliedAt).toLocaleDateString();

  return (
    <div
      onClick={() => navigate(`/student/applications/${application._id}`)}
      className="
        group
        bg-white
        rounded-3xl
        border
        border-slate-300
        p-5
        cursor-pointer
        hover:shadow-2xl
      hover:border-indigo-500
        transition-all
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex gap-3">
          <img
            src={companyLogo}
            alt={companyName}
            className="
              w-14
              h-14
              rounded-2xl
              border
              object-cover
              bg-white
            "
          />

          <div>
            <p className="text-sm text-slate-500">{companyName}</p>

            <h3 className="font-bold text-slate-800 text-lg">
              {application.job?.title}
            </h3>
          </div>
        </div>

        <ArrowUpRight
          size={18}
          className="
            text-slate-400
            group-hover:text-indigo-600
          "
        />
      </div>

      {/* Status */}

      <div className="mt-4">
        <ApplicationStatusBadge status={application.status} />
      </div>

      {/* Details */}

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Building2 size={16} />

          <span>{application.job?.location}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />

          <span>Applied On {appliedDate}</span>
        </div>
      </div>

      {/* Footer */}

      <div className="mt-5 pt-4 border-t">
        <button
          className="
            w-full
            py-2.5
            rounded-xl
            bg-indigo-600
            text-white
            font-medium
            hover:bg-indigo-700
            transition
          "
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicationsCard;
