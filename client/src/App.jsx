import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { getCurrentUser } from "./features/auth/authThunks";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getCurrentUser());
    }
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
