import { Routes, Route } from "react-router-dom";
import Landing from "../features/auth/pages/Landing";
import PublicRoute from "./PublicRoutes";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import StudentDashboard from "../features/student/pages/StudentDashboard";
import ProtectedRoute from "./ProtectedRoute";
import RecruiterDashboard from "../features/recruiter/pages/RecruiterDashboard";
import AdminDashboard from "../features/admin/pages/AdminDashboard";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import VerifyResetOtp from "../features/auth/pages/VerifyResetOtp";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌍 PUBLIC */}
      <Route path="/" element={<Landing />} />

      {/* 🚫 AUTH PAGES BLOCKED AFTER LOGIN */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/verify-email"
        element={
          <PublicRoute>
            <VerifyEmail />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/verify-reset-otp"
        element={
          <PublicRoute>
            <VerifyResetOtp />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <PublicRoute>
            <ResetPassword />
          </PublicRoute>
        }
      />

      {/* 🔐 PROTECTED */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* ❗ fallback */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
