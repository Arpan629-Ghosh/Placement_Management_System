import { Trophy, UsersRound } from "lucide-react";

const CandidateRankingEmpty = () => {
  return (
    <div
      className="
      flex
      flex-col
      items-center
      justify-center
      text-center
      py-24
      "
    >
      <div
        className="
        h-24
        w-24
        rounded-full
        bg-indigo-100
        flex
        items-center
        justify-center
        "
      >
        <UsersRound className="h-12 w-12 text-indigo-600" />
      </div>

      <h2 className="text-3xl font-bold mt-8">No Applicants Yet</h2>

      <p className="text-slate-500 mt-3 max-w-lg leading-7">
        Candidate ranking will appear automatically after students apply for
        this job and their resumes are analyzed by AI.
      </p>

      <div
        className="
        mt-8
        rounded-2xl
        border
        bg-slate-50
        px-8
        py-5
        flex
        items-center
        gap-4
        "
      >
        <Trophy className="text-yellow-500 w-6 h-6" />

        <div className="text-left">
          <p className="font-semibold">AI Ranking Ready</p>

          <p className="text-sm text-slate-500">
            Rankings are generated instantly once eligible candidates are
            available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CandidateRankingEmpty;
