import StatusBadge from "../../../components/ui/StatusBadge";

const ApplicationCard = ({ companyName, title, status, appliedAt }) => {
  return (
    <div
      className="
      bg-white
      rounded-xl
      border
      p-4
      flex
      justify-between
      items-center
    "
    >
      <div>
        <h3 className="font-semibold">{title}</h3>

        <p className="text-sm text-gray-500">{companyName}</p>

        <p className="text-xs text-gray-400 mt-1">Applied on {appliedAt}</p>
      </div>

      <StatusBadge status={status} />
    </div>
  );
};

export default ApplicationCard;
