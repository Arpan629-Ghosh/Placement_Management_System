import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import Loader from "@/components/ui/Loader";

import { getProfile } from "@/features/student/studentThunks";

const StudentProfileGuard = ({ children }) => {
  const dispatch = useDispatch();

  const { profile, profileFetched, profileLoading } = useSelector(
    (state) => state.student,
  );

  useEffect(() => {
    if (!profileFetched && !profileLoading) {
      dispatch(getProfile());
    }
  }, [dispatch, profileFetched, profileLoading]);

  if (!profileFetched) {
    return <Loader text="Checking profile..." />;
  }

  if (!profile) {
    return <Navigate to="/student/profile/create" replace />;
  }

  return children;
};

export default StudentProfileGuard;
