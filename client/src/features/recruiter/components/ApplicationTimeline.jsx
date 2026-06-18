import { CheckCircle2, Clock3, Circle, CalendarDays } from "lucide-react";

const ApplicationTimeline = ({ application }) => {
  const statusHistory = application?.statusHistory || [];

  const currentStatus = application?.status;

  console.log("Application Details:", application);

  console.log("Timeline Rendered", { statusHistory, currentStatus });

  const timelineSteps = [
    "applied",
    "under_review",
    "shortlisted",
    "interview_scheduled",
    "selected",
  ];

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
          mb-6
        "
      >
        Application Timeline
      </h2>

      <div className="space-y-6">
        {timelineSteps.map((step, index) => {
          const historyItem = statusHistory.find(
            (item) => item.status === step,
          );

          const completed = !!historyItem;

          const active = currentStatus === step;

          return (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                {completed ? (
                  <CheckCircle2 size={24} className="text-green-500" />
                ) : active ? (
                  <Clock3 size={24} className="text-indigo-500" />
                ) : (
                  <Circle size={24} className="text-slate-300" />
                )}

                {index !== timelineSteps.length - 1 && (
                  <div
                    className="
                      w-[2px]
                      flex-1
                      bg-slate-200
                      mt-2
                    "
                  />
                )}
              </div>

              <div className="pb-6">
                <h3
                  className="
                    font-semibold
                    capitalize
                  "
                >
                  {step.replaceAll("_", " ")}
                </h3>

                {historyItem && (
                  <>
                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-slate-500
                        mt-1
                      "
                    >
                      <CalendarDays size={14} />

                      {new Date(historyItem.updatedAt).toLocaleString()}
                    </div>

                    {historyItem.remarks && (
                      <p
                        className="
                          text-sm
                          text-slate-600
                          mt-2
                        "
                      >
                        {historyItem.remarks}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTimeline;
