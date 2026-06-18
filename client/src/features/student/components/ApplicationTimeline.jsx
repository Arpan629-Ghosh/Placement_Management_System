const steps = [
  {
    key: "applied",
    label: "Application Submitted",
  },

  {
    key: "under_review",
    label: "Under Review",
  },

  {
    key: "shortlisted",
    label: "Shortlisted",
  },

  {
    key: "interview_scheduled",
    label: "Interview Scheduled",
  },

  {
    key: "selected",
    label: "Selected",
  },
];

const getCurrentStep = (status) => {
  switch (status) {
    case "applied":
      return 0;

    case "under_review":
      return 1;

    case "shortlisted":
      return 2;

    case "interview_scheduled":
      return 3;

    case "selected":
      return 4;

    default:
      return 0;
  }
};

const ApplicationTimeline = ({ status }) => {
  const currentStep = getCurrentStep(status);

  const isRejected = status === "rejected";

  return (
    <div
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        p-6
      "
    >
      <h3 className="text-xl font-semibold mb-8">Application Progress</h3>

      {isRejected ? (
        <div
          className="
            p-5
            rounded-xl
            bg-red-50
            text-red-600
            font-semibold
          "
        >
          Application Rejected
        </div>
      ) : (
        <div className="space-y-8">
          {steps.map((step, index) => {
            const completed = index <= currentStep;

            return (
              <div key={step.key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      w-5
                      h-5
                      rounded-full
                      ${completed ? "bg-green-500" : "bg-slate-300"}
                    `}
                  />

                  {index !== steps.length - 1 && (
                    <div
                      className={`
                        w-1
                        h-12
                        ${completed ? "bg-green-500" : "bg-slate-300"}
                      `}
                    />
                  )}
                </div>

                <div>
                  <h4
                    className={`
                      font-semibold
                      ${completed ? "text-slate-800" : "text-slate-400"}
                    `}
                  >
                    {step.label}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApplicationTimeline;
