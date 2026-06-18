import { CalendarDays, MapPin, Video, Clock, ExternalLink } from "lucide-react";

const InterviewInfoCard = ({ interview }) => {
  if (!interview?.scheduled) return null;

  const interviewDate = interview?.date ? new Date(interview.date) : null;

  return (
    <div
      className="
        bg-white
        border
        border-slate-200
        rounded-3xl
        p-6
      "
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-indigo-50
            flex
            items-center
            justify-center
          "
        >
          <CalendarDays size={22} className="text-indigo-600" />
        </div>

        <div>
          <h3 className="text-xl font-bold">Interview Scheduled</h3>

          <p className="text-sm text-slate-500">
            Prepare for your upcoming interview
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Date */}

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-indigo-600" />

          <div>
            <p className="text-xs text-slate-500">Interview Date</p>

            <p className="font-medium">{interviewDate?.toLocaleDateString()}</p>
          </div>
        </div>

        {/* Time */}

        <div className="flex items-center gap-3">
          <Clock size={18} className="text-indigo-600" />

          <div>
            <p className="text-xs text-slate-500">Time</p>

            <p className="font-medium">{interviewDate?.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Mode */}

        <div className="flex items-center gap-3">
          {interview.mode === "online" ? (
            <Video size={18} className="text-indigo-600" />
          ) : (
            <MapPin size={18} className="text-indigo-600" />
          )}

          <div>
            <p className="text-xs text-slate-500">Interview Mode</p>

            <p className="font-medium capitalize">{interview.mode}</p>
          </div>
        </div>

        {/* Location */}

        {interview.location && (
          <div className="flex items-center gap-3">
            <MapPin size={18} className="text-indigo-600" />

            <div>
              <p className="text-xs text-slate-500">Location</p>

              <p className="font-medium">{interview.location}</p>
            </div>
          </div>
        )}

        {/* Meeting Link */}

        {interview.meetingLink && (
          <a
            href={interview.meetingLink}
            target="_blank"
            rel="noreferrer"
            className="
              mt-3
              inline-flex
              items-center
              gap-2
              px-4
              py-3
              rounded-xl
              bg-indigo-600
              text-white
              font-medium
              hover:bg-indigo-700
              transition
            "
          >
            Join Meeting
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>
  );
};

export default InterviewInfoCard;
