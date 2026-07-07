import CandidateRankingCard from "./CandidateRankingCard";

const CandidateRankingList = ({ candidates = [] }) => {
  if (!candidates.length) {
    return (
      <div
        className="
        bg-white
        rounded-3xl
        border
        p-20
        text-center
        shadow-sm
        "
      >
        <h2 className="text-2xl font-bold text-slate-700">No Applicants Yet</h2>

        <p className="text-slate-500 mt-2">
          Candidates will appear here after they apply.
        </p>
      </div>
    );
  }

  return (
    <div className="grid xl:grid-cols-2 gap-6">
      {candidates.map((candidate) => (
        <CandidateRankingCard
          key={candidate.student.user._id}
          candidate={candidate}
        />
      ))}
    </div>
  );
};

export default CandidateRankingList;
