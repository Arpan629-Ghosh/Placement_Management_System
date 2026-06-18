const statusConfig = {
  applied: {
    label: "Applied",
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },

  under_review: {
    label: "Under Review",
    className: "bg-amber-100 text-amber-700 border-amber-200",
  },

  shortlisted: {
    label: "Shortlisted",
    className: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },

  interview_scheduled: {
    label: "Interview Scheduled",
    className: "bg-purple-100 text-purple-700 border-purple-200",
  },

  selected: {
    label: "Selected",
    className: "bg-green-100 text-green-700 border-green-200",
  },

  rejected: {
    label: "Rejected",
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

const ApplicationStatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.applied;

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        border
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
};

export default ApplicationStatusBadge;
