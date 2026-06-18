const statusConfig = {
  open: "bg-emerald-50 text-emerald-700 border-emerald-200",
  approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  selected: "bg-emerald-50 text-emerald-700 border-emerald-200",

  under_review: "bg-amber-50 text-amber-700 border-amber-200",

  shortlisted: "bg-blue-50 text-blue-700 border-blue-200",

  interview_scheduled: "bg-violet-50 text-violet-700 border-violet-200",

  rejected: "bg-red-50 text-red-700 border-red-200",

  closed: "bg-slate-50 text-slate-700 border-slate-200",
};

const StatusBadge = ({ status }) => {
  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        px-3
        py-1.5
        rounded-xl
        border
        text-xs
        font-semibold
        whitespace-nowrap
        capitalize
        w-fit
        ${statusConfig[status] || "bg-slate-50 text-slate-700 border-slate-200"}
      `}
    >
      {status?.replaceAll("_", " ")}
    </span>
  );
};

export default StatusBadge;
