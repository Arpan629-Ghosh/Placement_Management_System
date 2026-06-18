import { FileText, ExternalLink, Download } from "lucide-react";

const ResumeViewerCard = ({ resume }) => {
  if (!resume?.url) {
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
        <h2 className="text-lg font-bold mb-4">Resume</h2>

        <p className="text-slate-500">Resume not available.</p>
      </div>
    );
  }

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
      <div className="flex items-center gap-3 mb-5">
        <div
          className="
            p-3
            rounded-xl
            bg-red-50
          "
        >
          <FileText size={22} className="text-red-600" />
        </div>

        <div>
          <h2 className="font-bold text-slate-800">Resume Snapshot</h2>

          <p className="text-sm text-slate-500">Candidate submitted resume</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a
          href={resume.url}
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            bg-indigo-600
            text-white
            hover:bg-indigo-700
            transition
          "
        >
          <ExternalLink size={18} />
          Preview
        </a>

        <a
          href={resume.url}
          download
          className="
            flex
            items-center
            justify-center
            gap-2
            py-3
            rounded-xl
            border
            hover:bg-slate-50
            transition
          "
        >
          <Download size={18} />
          Download
        </a>
      </div>
    </div>
  );
};

export default ResumeViewerCard;
