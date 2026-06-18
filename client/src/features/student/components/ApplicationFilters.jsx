import { Search } from "lucide-react";

const ApplicationFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-5
        shadow-sm
      "
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Search */}

        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            value={searchTerm}
            placeholder="Search company or job..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full
              pl-11
              pr-4
              py-3
              border
              rounded-xl
              outline-none
              focus:ring-2
              focus:ring-indigo-500
            "
          />
        </div>

        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="
            border
            rounded-xl
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        >
          <option value="all">All Status</option>
          <option value="applied">Applied</option>
          <option value="under_review">Under Review</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="interview_scheduled">Interview Scheduled</option>
          <option value="selected">Selected</option>
          <option value="rejected">Rejected</option>
        </select>

        {/* Sort */}

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="
    w-full
    border
    border-slate-300
    rounded-xl
    px-4
    py-3
    bg-white
    text-slate-700
    outline-none
    focus:ring-2
    focus:ring-indigo-500
    focus:border-indigo-500
  "
        >
          <option value="latest">Latest Applications</option>
          <option value="oldest">Oldest Applications</option>
          <option value="company">Company Name</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};

export default ApplicationFilters;
