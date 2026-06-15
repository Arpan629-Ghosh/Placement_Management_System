import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createJob, updateJob } from "../recruiterThunks";
import { X } from "lucide-react";

const initialState = {
  title: "",
  companyName: "",
  location: "",
  jobType: "full_time",
  visibility: "public",
  applicationDeadline: "",

  salaryMin: "",
  salaryMax: "",

  minCGPA: "",
  departmentAllowed: "",
  allowedYears: "",

  requiredSkills: "",
  description: "",
};

const JobFormModal = ({ isOpen, onClose, editJob = null }) => {
  const dispatch = useDispatch();

  const { jobsLoading } = useSelector((state) => state.recruiter);

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editJob) {
      setFormData({
        title: editJob.title || "",
        companyName: editJob.companyName || "",
        location: editJob.location || "",
        description: editJob.description || "",

        jobType: editJob.jobType || "full_time",
        visibility: editJob.visibility || "public",

        applicationDeadline: editJob.applicationDeadline?.split("T")[0] || "",

        salaryMin: editJob.salaryRange?.min || "",
        salaryMax: editJob.salaryRange?.max || "",

        minCGPA: editJob.eligibilityCriteria?.minCGPA || "",

        departmentAllowed:
          editJob.eligibilityCriteria?.departmentAllowed?.join(", ") || "",

        allowedYears:
          editJob.eligibilityCriteria?.allowedYears?.join(", ") || "",

        requiredSkills: editJob.requiredSkills?.join(", ") || "",
      });
    } else {
      setFormData(initialState);
    }
  }, [editJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      companyName: formData.companyName,
      location: formData.location,
      description: formData.description,
      jobType: formData.jobType,
      visibility: formData.visibility,
      applicationDeadline: formData.applicationDeadline,

      salaryRange: {
        min: Number(formData.salaryMin) || 0,
        max: Number(formData.salaryMax) || 0,
      },

      requiredSkills: formData.requiredSkills
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      eligibilityCriteria: {
        minCGPA: Number(formData.minCGPA) || 0,

        departmentAllowed: formData.departmentAllowed
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        allowedYears: formData.allowedYears
          .split(",")
          .map((item) => Number(item.trim()))
          .filter(Boolean),
      },
    };

    let result;

    if (editJob) {
      result = await dispatch(
        updateJob({
          jobId: editJob._id,
          data: payload,
        }),
      );
    } else {
      result = await dispatch(createJob(payload));
    }

    if (result.meta.requestStatus === "fulfilled") {
      onClose();
      setFormData(initialState);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="
      fixed inset-0 
      flex items-center justify-center
      p-4
    "
    >
      <div
        className="
            bg-slate-100
    backdrop-blur-md
    rounded-3xl
    shadow-2xl
    border border-white/30
    w-full
    max-w-5xl
    max-h-[90vh]
    flex flex-col
    overflow-hidden
      "
      >
        {/* Header */}

        <div
          className="
          flex items-center justify-between
          px-8 py-6
          border-b
              bg-indigo-600 text-white p-6
        "
        >
          <div>
            <h2 className="text-2xl font-bold ">
              {editJob ? "Edit Job" : "Create New Job"}
            </h2>

            <p className=" mt-1">Fill in the job details below.</p>
          </div>

          <button
            onClick={onClose}
            className="
            p-2
            rounded-full
            hover:bg-slate-100
            transition
          "
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="
    flex-1
    overflow-y-auto
    px-8
    py-6
    space-y-6
  "
        >
          {/* Basic Information */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-5">Basic Information</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Job Type
                </label>

                <select
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="internship">Internship</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Visibility
                </label>

                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Application Deadline
                </label>

                <input
                  type="date"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* Salary Range */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-5">Salary Range</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum Salary
                </label>

                <input
                  type="number"
                  name="salaryMin"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Maximum Salary
                </label>

                <input
                  type="number"
                  name="salaryMax"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* Eligibility */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-5">Eligibility Criteria</h3>

            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Minimum CGPA
                </label>

                <input
                  type="number"
                  step="0.01"
                  name="minCGPA"
                  value={formData.minCGPA}
                  onChange={handleChange}
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Allowed Years
                </label>

                <input
                  type="text"
                  name="allowedYears"
                  value={formData.allowedYears}
                  onChange={handleChange}
                  placeholder="2026,2027"
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Allowed Departments
                </label>

                <input
                  type="text"
                  name="departmentAllowed"
                  value={formData.departmentAllowed}
                  onChange={handleChange}
                  placeholder="CSE, IT, ECE"
                  className="w-full border border-slate-400 rounded-xl px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* Skills */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-5">Required Skills</h3>

            <textarea
              rows={3}
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB, Redux"
              className="
        w-full
        border
        border-slate-400
        rounded-xl
        px-4
        py-3
        resize-none
      "
            />
          </div>

          {/* Description */}

          <div className="border rounded-2xl p-5">
            <h3 className="font-semibold text-lg mb-5">Job Description</h3>

            <textarea
              rows={8}
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="
        w-full
        border
        border-slate-400
        rounded-xl
        px-4
        py-3
        resize-none
      "
            />
          </div>

          {/* Footer */}

          <div
            className="
      flex justify-end gap-3
      pt-6
      border-t
    "
          >
            <button
              type="button"
              onClick={onClose}
              className="
        px-5 py-3
        rounded-xl
        border
        border-slate-400
        hover:bg-slate-50
      "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={jobsLoading}
              className="
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        px-6
        py-3
        rounded-xl
        disabled:opacity-50
      "
            >
              {jobsLoading
                ? "Saving..."
                : editJob
                  ? "Update Job"
                  : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;
