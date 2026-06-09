import { useRef } from "react";

const ResumeUpload = ({ onUpload, loading }) => {
  const fileRef = useRef();

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    onUpload(file);
  };

  return (
    <div
      className="
      bg-white
      border-2
      border-dashed
      rounded-xl
      p-6
      text-center
    "
    >
      <input
        type="file"
        accept=".pdf"
        hidden
        ref={fileRef}
        onChange={handleChange}
      />

      <button
        onClick={() => fileRef.current.click()}
        className="
        bg-blue-600
        text-white
        px-5
        py-2
        rounded-lg
      "
      >
        {loading ? "Uploading..." : "Upload Resume"}
      </button>

      <p className="mt-3 text-sm text-gray-500">PDF only</p>
    </div>
  );
};

export default ResumeUpload;
