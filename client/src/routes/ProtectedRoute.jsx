import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { user, token } = useSelector((state) => state.auth);

  // ❌ not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ role mismatch
  if (role && user?.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
