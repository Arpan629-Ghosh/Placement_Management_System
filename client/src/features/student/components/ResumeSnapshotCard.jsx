import { FileText, Download, ExternalLink } from "lucide-react";

const ResumeSnapshotCard = ({ resume }) => {
  if (!resume?.url) return null;

  const fileName = resume.url.split("/").pop() || "Resume";

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
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
            w-12
            h-12
            rounded-2xl
            bg-red-50
            flex
            items-center
            justify-center
          "
        >
          <FileText size={22} className="text-red-600" />
        </div>

        <div>
          <h3 className="text-xl font-bold">Resume Snapshot</h3>

          <p className="text-sm text-slate-500">
            Resume submitted during application
          </p>
        </div>
      </div>

      <div
        className="
          flex
          items-center
          justify-between
          gap-4
          p-4
          rounded-2xl
          bg-slate-50
          border
        "
      >
        <div className="flex items-center gap-3">
          <FileText size={22} className="text-red-600" />

          <div>
            <p className="font-medium">{fileName}</p>

            <p className="text-sm text-slate-500">Submitted Resume</p>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={resume.url}
            target="_blank"
            rel="noreferrer"
            className="
              p-3
              rounded-xl
              bg-indigo-100
              text-indigo-700
              hover:bg-indigo-200
              transition
            "
          >
            <ExternalLink size={18} />
          </a>

          <a
            href={resume.url}
            download
            className="
              p-3
              rounded-xl
              bg-green-100
              text-green-700
              hover:bg-green-200
              transition
            "
          >
            <Download size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ResumeSnapshotCard;
