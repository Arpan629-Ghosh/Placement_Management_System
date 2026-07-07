import { useNavigate } from "react-router-dom";
import {
  Trophy,
  Medal,
  Award,
  Briefcase,
  GraduationCap,
  Star,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

const CandidateRankingCard = ({ candidate }) => {
  const navigate = useNavigate();

  const {
    student,
    rank,
    score,
    matchedSkills,
    missingSkills,
    projectScore,
    resumeScore,
    reason,
  } = candidate;

  const getRankIcon = () => {
    if (rank === 1) return <Trophy className="text-yellow-500 w-7 h-7" />;

    if (rank === 2) return <Medal className="text-gray-500 w-7 h-7" />;

    if (rank === 3) return <Award className="text-amber-600 w-7 h-7" />;

    return <div className="text-xl font-bold text-slate-600">#{rank}</div>;
  };

  return (
    <div
      className="
      bg-white
      rounded-3xl
      border
      shadow-md
      p-6
      hover:shadow-xl
      transition-all
      duration-300
      space-y-6
      "
    >
      {/* Header */}

      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          {student?.profilePicture?.url ? (
            <img
              src={student.profilePicture.url}
              alt={student.user.name}
              className="h-14 w-14 rounded-full object-cover border"
            />
          ) : (
            <div
              className="
              h-14
              w-14
              rounded-full
              bg-indigo-100
              flex
              items-center
              justify-center
              text-xl
              font-bold
              text-indigo-700
              "
            >
              {student.user.name.charAt(0)}
            </div>
          )}

          <div>
            <h2 className="font-bold text-lg">{student.user.name}</h2>

            <p className="text-sm text-slate-500">{student.user.email}</p>
          </div>
        </div>

        {getRankIcon()}
      </div>

      {/* Match Score */}

      <div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Overall Match</span>

          <span className="font-bold text-indigo-700">{score}%</span>
        </div>

        <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500"
            style={{
              width: `${score}%`,
            }}
          />
        </div>
      </div>

      {/* Metrics */}

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 rounded-xl p-4">
          <Briefcase className="w-5 h-5 mb-2 text-blue-600" />

          <p className="text-sm text-slate-500">Project Score</p>

          <h3 className="font-bold">{projectScore}</h3>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <GraduationCap className="w-5 h-5 mb-2 text-green-600" />

          <p className="text-sm text-slate-500">Resume Score</p>

          <h3 className="font-bold">{resumeScore}</h3>
        </div>
      </div>

      {/* Matched Skills */}

      <div>
        <h4 className="font-semibold flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          Matched Skills
        </h4>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}

      {missingSkills.length > 0 && (
        <div>
          <h4 className="font-semibold flex items-center gap-2 mb-3">
            <XCircle className="w-5 h-5 text-red-500" />
            Missing Skills
          </h4>

          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendation */}

      <div className="rounded-xl bg-indigo-50 p-4">
        <div className="flex gap-2 items-center mb-2">
          <Star className="w-5 h-5 text-indigo-600" />

          <span className="font-semibold">AI Recommendation</span>
        </div>

        <p className="text-slate-700 text-sm">{reason}</p>
      </div>

      {/* Action */}

      <button
        onClick={() =>
          navigate(`/recruiter/applications/${candidate.student.applicationId}`)
        }
        className="
        w-full
        flex
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        font-medium
        py-3
        transition
        "
      >
        View Application
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CandidateRankingCard;
