import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { scheduleInterview } from "../recruiterThunks";

const ScheduleInterviewModal = ({ open, onClose, application }) => {
  const dispatch = useDispatch();
  const { interviewLoading } = useSelector((state) => state.recruiter);
  const [formData, setFormData] = useState({
    date: "",
    mode: "online",
    meetingLink: "",
    location: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    await dispatch(
      scheduleInterview({
        applicationId: application._id,
        interviewData: formData,
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
          max-w-xl
          rounded-3xl
          p-6
        "
      >
        <h2 className="text-xl font-bold mb-5">Schedule Interview</h2>

        <div className="space-y-4">
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />

          <select
            name="mode"
            value={formData.mode}
            onChange={handleChange}
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          >
            <option value="online">Online</option>

            <option value="offline">Offline</option>
          </select>

          {formData.mode === "online" ? (
            <input
              type="text"
              name="meetingLink"
              placeholder="Meeting Link"
              value={formData.meetingLink}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          ) : (
            <input
              type="text"
              name="location"
              placeholder="Interview Location"
              value={formData.location}
              onChange={handleChange}
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />
          )}
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
            {interviewLoading ? "Scheduling..." : "Schedule"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewModal;
