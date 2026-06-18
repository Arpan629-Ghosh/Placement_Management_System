import { useNavigate } from "react-router-dom";

const JobCard = ({
  companyLogo,
  jobId,
  companyName,
  title,
  location,
  salary,
  jobType,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/student/jobs/${jobId}`);
  };
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-5
      border
      shadow-sm
      hover:shadow-md
      transition
    "
    >
      <div className="flex items-center gap-3">
        <img
          src={companyLogo}
          alt={companyName}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold">{companyName}</h3>

          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <p>{location}</p>
        <p>{salary}</p>
        <p>{jobType}</p>
      </div>

      <button
        onClick={handleCardClick}
        className="
          mt-4
          w-full
          bg-blue-600
          text-white
          rounded-lg
          py-2
          hover:bg-blue-700
        "
      >
        See Details
      </button>
    </div>
  );
};

export default JobCard;
