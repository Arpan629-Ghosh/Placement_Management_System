const statusStyles = {
  applied: "bg-blue-100 text-blue-700",

  under_review: "bg-yellow-100 text-yellow-700",

  shortlisted: "bg-purple-100 text-purple-700",

  interview_scheduled: "bg-indigo-100 text-indigo-700",

  selected: "bg-green-100 text-green-700",

  rejected: "bg-red-100 text-red-700",
};

const ApplicationStatusBadge = ({ status }) => {
  if (!status) return null;

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-medium
        ${statusStyles[status] || "bg-slate-100 text-slate-700"}
      `}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
};

export default ApplicationStatusBadge;
