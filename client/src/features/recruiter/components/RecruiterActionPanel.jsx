import { useState } from "react";

import StatusUpdateModal from "./StatusUpdateModal";
import ScheduleInterviewModal from "./ScheduleInterviewModal";

const RecruiterActionPanel = ({ application }) => {
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [interviewModalOpen, setInterviewModalOpen] = useState(false);

  return (
    <>
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
            mb-5
          "
        >
          Recruiter Actions
        </h2>

        <div className="space-y-3">
          <button
            onClick={() => setStatusModalOpen(true)}
            className="
              w-full
              py-3
              rounded-xl
              bg-indigo-600
              text-white
              hover:bg-indigo-700
            "
          >
            Update Status
          </button>

          <button
            onClick={() => setInterviewModalOpen(true)}
            disabled={application?.status !== "shortlisted"}
            className="
              w-full
              py-3
              rounded-xl
              border
              disabled:opacity-50
              disabled:cursor-not-allowed
              hover:bg-slate-50
            "
          >
            Schedule Interview
          </button>
        </div>
      </div>

      <StatusUpdateModal
        open={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        application={application}
      />

      <ScheduleInterviewModal
        open={interviewModalOpen}
        onClose={() => setInterviewModalOpen(false)}
        application={application}
      />
    </>
  );
};

export default RecruiterActionPanel;
