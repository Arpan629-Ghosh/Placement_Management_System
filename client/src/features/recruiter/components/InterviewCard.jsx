import { CalendarDays, Clock3, MapPin, Video, Mail } from "lucide-react";

const InterviewCard = ({ interview }) => {
  const student = interview?.student;

  const interviewInfo = interview?.interview;

  const interviewDate = interviewInfo?.date
    ? new Date(interviewInfo.date)
    : null;

  return (
    <div
      className="
        bg-white
        border
        rounded-3xl
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <div className="flex items-center gap-4">
        <img
          src={
            student?.profilePicture?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              student?.name || "Student",
            )}`
          }
          alt={student?.name}
          className="
            h-14
            w-14
            rounded-full
            object-cover
            border
          "
        />

        <div>
          <h3 className="font-bold text-slate-800">{student?.name}</h3>

          <p className="text-sm text-slate-500">{interview?.job?.title}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-3">
          <Mail size={16} className="text-slate-500" />

          <span className="text-sm text-slate-700">{student?.email}</span>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={16} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            {interviewDate?.toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 size={16} className="text-slate-500" />

          <span className="text-sm text-slate-700">
            {interviewDate?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {interviewInfo?.mode === "online" ? (
            <Video size={16} className="text-slate-500" />
          ) : (
            <MapPin size={16} className="text-slate-500" />
          )}

          <span className="text-sm text-slate-700 capitalize">
            {interviewInfo?.mode}
          </span>
        </div>
      </div>

      {interviewInfo?.mode === "online" && interviewInfo?.meetingLink && (
        <a
          href={interviewInfo.meetingLink}
          target="_blank"
          rel="noreferrer"
          className="
              mt-5
              block
              w-full
              text-center
              bg-indigo-600
              text-white
              py-2.5
              rounded-xl
              text-sm
              font-medium
            "
        >
          Join Meeting
        </a>
      )}

      {interviewInfo?.mode === "offline" && interviewInfo?.location && (
        <div
          className="
              mt-5
              p-3
              rounded-xl
              bg-slate-50
              text-sm
              text-slate-600
            "
        >
          Venue: {interviewInfo.location}
        </div>
      )}
    </div>
  );
};

export default InterviewCard;
