import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateApplicationStatus } from "../recruiterThunks";

const StatusUpdateModal = ({ open, onClose, application }) => {
  const dispatch = useDispatch();

  const { statusUpdateLoading } = useSelector((state) => state.recruiter);

  const [status, setStatus] = useState(application?.status || "");

  const [remarks, setRemarks] = useState("");

  if (!open) return null;

  const handleSubmit = async () => {
    await dispatch(
      updateApplicationStatus({
        applicationId: application._id,
        status,
        remarks,
      }),
    );

    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/40
        z-50
        flex
        items-center
        justify-center
      "
    >
      <div
        className="
          bg-white
          w-full
          max-w-lg
          rounded-3xl
          p-6
        "
      >
        <h2 className="text-xl font-bold mb-5">Update Application Status</h2>

        <div className="space-y-4">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          >
            <option value="applied">Applied</option>

            <option value="under_review">Under Review</option>

            <option value="shortlisted">Shortlisted</option>

            <option value="selected">Selected</option>

            <option value="rejected">Rejected</option>
          </select>

          <textarea
            rows={4}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Remarks"
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />
        </div>

        <div
          className="
            flex
            justify-end
            gap-3
            mt-6
          "
        >
          <button
            onClick={onClose}
            className="
              px-5
              py-2
              border
              rounded-xl
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-5
              py-2
              rounded-xl
              bg-indigo-600
              text-white
            "
          >
            {statusUpdateLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdateModal;
