import { Search } from "lucide-react";

const InterviewFilters = ({
  searchTerm,
  setSearchTerm,
  modeFilter,
  setModeFilter,
  sortBy,
  setSortBy,
}) => {
  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-5
        flex
        flex-col
        lg:flex-row
        gap-4
      "
    >
      <div className="relative flex-1">
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
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search candidate..."
          className="
            w-full
            h-11
            pl-11
            pr-4
            rounded-xl
            border
            outline-none
          "
        />
      </div>

      <select
        value={modeFilter}
        onChange={(e) => setModeFilter(e.target.value)}
        className="
          h-11
          px-4
          rounded-xl
          border
          outline-none
        "
      >
        <option value="all">All Modes</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="
          h-11
          px-4
          rounded-xl
          border
          outline-none
        "
      >
        <option value="upcoming">Upcoming First</option>

        <option value="latest">Latest Scheduled</option>

        <option value="candidate">Candidate Name</option>
      </select>
    </div>
  );
};

export default InterviewFilters;
