import { Mail, Phone, CalendarDays, User } from "lucide-react";

const CandidateInfoCard = ({ application }) => {
  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-6
        shadow-sm
      "
    >
      <h2
        className="
          text-lg
          font-bold
          text-slate-800
          mb-5
        "
      >
        Candidate Information
      </h2>

      <div className="flex flex-col items-center text-center">
        <img
          src={
            application?.student?.profilePicture?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              application?.student?.name || "Student",
            )}`
          }
          alt={application?.student?.name}
          className="
            w-24
            h-24
            rounded-full
            object-cover
            border
          "
        />

        <h3 className="mt-4 text-xl font-bold text-slate-800">
          {application?.student?.name}
        </h3>

        <p className="text-slate-500 text-sm">
          Department: {application?.student?.department || "N/A"}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            {application?.student?.email || "N/A"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            {application?.student?.contactNumber || "Not Available"}
          </span>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-slate-800">Skills</h4>

            <span
              className="
        text-xs
        px-2 py-1
        rounded-full
        bg-slate-100
        text-slate-600
      "
            >
              {application?.student?.skills?.length || 0} Skills
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {application?.student?.skills?.length > 0 ? (
              application.student.skills.map((skill, index) => (
                <span
                  key={index}
                  className="
            px-3
            py-1.5
            rounded-xl
            border
            border-indigo-100
            bg-indigo-50
            text-indigo-700
            text-xs
            font-medium
            hover:bg-indigo-100
            transition
          "
                >
                  {skill}
                </span>
              ))
            ) : (
              <div
                className="
          w-full
          text-center
          py-4
          rounded-xl
          bg-slate-50
          text-slate-500
          text-sm
        "
              >
                No skills added
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <User size={18} className="text-slate-500" />

          <span className="text-sm text-slate-700">Student</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            Applied on {new Date(application?.appliedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            Passing Year: {application?.student?.passingYear}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CandidateInfoCard;
