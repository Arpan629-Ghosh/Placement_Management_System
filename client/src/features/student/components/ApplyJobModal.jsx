import { X, FileText, AlertCircle } from "lucide-react";

const ApplyJobModal = ({
  open,
  onClose,
  job,
  hasResume,
  loading,
  onConfirm,
}) => {
  if (!open || !job) return null;

  const companyName =
    job.recruiter?.companyName || job.companyName || "Unknown Company";

  const companyLogo =
    job.recruiter?.companyLogo?.url ||
    job.companyLogo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(companyName)}`;

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        flex
        items-center
        justify-center
        z-50
        p-4
      "
    >
      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-lg
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            p-6
            border-b
          "
        >
          <h2 className="text-xl font-bold">Confirm Application</h2>

          <button
            onClick={onClose}
            className="
              p-2
              rounded-lg
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}

        <div className="p-6">
          {/* Company */}

          <div className="flex items-center gap-4">
            <img
              src={companyLogo}
              alt={companyName}
              className="
                w-16
                h-16
                rounded-2xl
                object-cover
                border
              "
            />

            <div>
              <h3 className="font-bold text-lg">{job.title}</h3>

              <p className="text-slate-500">{companyName}</p>
            </div>
          </div>

          {/* Resume Status */}

          <div
            className="
              mt-6
              border
              rounded-2xl
              p-4
            "
          >
            <div className="flex items-center gap-3">
              <FileText size={20} className="text-indigo-600" />

              <div>
                <p className="font-medium">Resume Status</p>

                <p className="text-sm text-slate-500">
                  {hasResume ? "Resume available" : "No resume uploaded"}
                </p>
              </div>
            </div>
          </div>

          {/* Warning */}

          <div
            className="
              mt-4
              bg-amber-50
              border
              border-amber-200
              rounded-2xl
              p-4
            "
          >
            <div className="flex gap-3">
              <AlertCircle size={20} className="text-amber-600 shrink-0" />

              <p className="text-sm text-amber-800">
                Once submitted, your current resume will be attached to this
                application.
              </p>
            </div>
          </div>

          {!hasResume && (
            <div
              className="
                mt-4
                bg-red-50
                border
                border-red-200
                rounded-2xl
                p-4
                text-red-700
                text-sm
              "
            >
              Please upload a resume before applying.
            </div>
          )}
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            p-6
            flex
            justify-end
            gap-3
          "
        >
          <button
            onClick={onClose}
            className="
              px-5
              py-2.5
              rounded-xl
              border
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            disabled={!hasResume || loading}
            onClick={onConfirm}
            className="
              px-5
              py-2.5
              rounded-xl
              bg-indigo-600
              text-white
              hover:bg-indigo-700
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Applying..." : "Apply Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
