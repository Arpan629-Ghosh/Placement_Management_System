import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RecruiterApprovalGuard = ({ children }) => {
  const { profile } = useSelector((state) => state.recruiter);

  if (!profile) {
    return <Navigate to="/recruiter/profile/create" replace />;
  }

  if (
    profile.approvalStatus === "pending" ||
    profile.approvalStatus === "rejected"
  ) {
    return <Navigate to="/recruiter/pending-approval" replace />;
  }

  return children;
};

export default RecruiterApprovalGuard;
