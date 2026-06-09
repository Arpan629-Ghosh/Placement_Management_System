import { Routes, Route } from "react-router-dom";

import Landing from "../features/auth/pages/Landing";

import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoute";
import StudentProfileGuard from "./StudentProfileGuard";

import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyEmail from "../features/auth/pages/VerifyEmail";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyResetOtp from "../features/auth/pages/VerifyResetOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";

import StudentDashboard from "../features/student/pages/StudentDashboard";
import RecruiterDashboard from "../features/recruiter/pages/RecruiterDashboard";
import AdminDashboard from "../features/admin/pages/AdminDashboard";

/* Student Profile Pages */
import CreateProfilePage from "../features/student/pages/CreateProfilePage";
import ProfilePage from "../features/student/pages/ProfilePage";
import EditProfilePage from "../features/student/pages/EditProfilePage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =========================================
          PUBLIC ROUTES
      ========================================= */}

      <Route path="/" element={<Landing />} />

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

      {/* =========================================
          STUDENT PROFILE CREATION
      ========================================= */}

      <Route
        path="/student/profile/create"
        element={
          <ProtectedRoute role="student">
            <CreateProfilePage />
          </ProtectedRoute>
        }
      />

      {/* =========================================
          STUDENT ROUTES
      ========================================= */}

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentProfileGuard>
              <StudentDashboard />
            </StudentProfileGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="student">
            <StudentProfileGuard>
              <ProfilePage />
            </StudentProfileGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile/edit"
        element={
          <ProtectedRoute role="student">
            <StudentProfileGuard>
              <EditProfilePage />
            </StudentProfileGuard>
          </ProtectedRoute>
        }
      />

      {/* =========================================
          RECRUITER ROUTES
      ========================================= */}

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      {/* =========================================
          ADMIN ROUTES
      ========================================= */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* =========================================
          404
      ========================================= */}

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
