import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loader from "@/components/ui/Loader";

import { getRecruiterProfile } from "@/features/recruiter/recruiterThunks";

const RecruiterProfileGuard = ({ children }) => {
  const dispatch = useDispatch();

  const { profile, loading, profileFetched } = useSelector(
    (state) => state.recruiter,
  );

  useEffect(() => {
    if (!profileFetched) {
      dispatch(getRecruiterProfile());
    }
  }, [dispatch, profileFetched]);

  if (loading || !profileFetched) {
    return <Loader text="Checking recruiter profile..." />;
  }

  // No profile -> create profile
  if (!profile) {
    return <Navigate to="/recruiter/profile/create" replace />;
  }

  return children;
};

export default RecruiterProfileGuard;
