import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { user, token } = useSelector((state) => state.auth);

  // ✅ if logged in → redirect to dashboard
  if (user && token) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return children;
};

export default PublicRoute;
