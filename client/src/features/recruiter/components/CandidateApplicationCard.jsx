import { Mail, CalendarDays, Eye } from "lucide-react";

import { useNavigate } from "react-router-dom";

import ApplicationStatusBadge from "./ApplicationStatusBadge";

const CandidateApplicationCard = ({ application }) => {
  const navigate = useNavigate();

  const student = application.student;

  const handleView = () => {
    navigate(`/recruiter/applications/${application._id}`);
  };

  return (
    <div
      className="
        bg-white
        border
        border-slate-300
        rounded-3xl
        p-5
        shadow-sm
        hover:shadow-2xl
      hover:border-indigo-500
        transition
      "
    >
      {/* Header */}

      <div className="flex items-center gap-4">
        <img
          src={
            student?.profilePicture?.profilePicture?.url ||
            student?.profilePicture?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student?.name || "Student",
            )}`
          }
          alt={student?.name}
          className="
            w-14
            h-14
            rounded-full
            object-cover
            border
          "
        />

        <div className="flex-1 min-w-0">
          <h3
            className="
              font-semibold
              text-slate-800
              truncate
            "
          >
            {student?.name}
          </h3>

          <p
            className="
              text-sm
              text-slate-500
              truncate
            "
          >
            {student?.email}
          </p>
        </div>
      </div>

      {/* Job */}

      <div className="mt-5">
        <p className="text-xs text-slate-500">Applied For</p>

        <h4
          className="
            font-semibold
            text-slate-800
            mt-1
            line-clamp-2
          "
        >
          {application.job?.title}
        </h4>
      </div>

      {/* Status */}

      <div className="mt-4">
        <ApplicationStatusBadge status={application.status} />
      </div>

      {/* Info */}

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail size={16} />
          <span className="truncate">{student?.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <CalendarDays size={16} />

          <span>{new Date(application.appliedAt).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Actions */}

      <div className="mt-5 pt-4 border-t">
        <button
          onClick={handleView}
          className="
            w-full
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            bg-indigo-600
            text-white
            hover:bg-indigo-700
            transition
          "
        >
          <Eye size={18} />
          View Application
        </button>
      </div>
    </div>
  );
};

export default CandidateApplicationCard;
