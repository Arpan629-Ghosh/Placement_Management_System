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

import RecruiterProfileGuard from "./RecruiterProfileGuard";
import RecruiterApprovalGuard from "./RecruiterApprovalGuard";

/* Recruiter Profile Pages */
import CreateRecruiterProfilePage from "../features/recruiter/pages/CreateRecruiterProfilePage";
import RecruiterProfilePage from "../features/recruiter/pages/RecruiterProfilePage";
import EditRecruiterProfilePage from "../features/recruiter/pages/EditRecruiterProfilePage";
import PendingApprovalPage from "../features/recruiter/pages/PendingApprovalPage";
import RecruiterApprovals from "../features/admin/pages/RecruiterApproval";
import UserManagementPage from "../features/admin/pages/UserManagement";
import ReportsPage from "../features/admin/pages/Reports";
import AnalyticsPage from "../features/admin/pages/Analytics";

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
    RECRUITER PROFILE CREATION
========================================= */}

      <Route
        path="/recruiter/profile/create"
        element={
          <ProtectedRoute role="recruiter">
            <CreateRecruiterProfilePage />
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
            <RecruiterProfileGuard>
              <RecruiterApprovalGuard>
                <RecruiterDashboard />
              </RecruiterApprovalGuard>
            </RecruiterProfileGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/profile"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterProfileGuard>
              <RecruiterProfilePage />
            </RecruiterProfileGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/profile/edit"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterProfileGuard>
              <EditRecruiterProfilePage />
            </RecruiterProfileGuard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/pending-approval"
        element={
          <ProtectedRoute role="recruiter">
            <RecruiterProfileGuard>
              <PendingApprovalPage />
            </RecruiterProfileGuard>
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

      <Route
        path="/admin/recruiters"
        element={
          <ProtectedRoute role="admin">
            <RecruiterApprovals />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute role="admin">
            <UserManagementPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute role="admin">
            <ReportsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <ProtectedRoute role="admin">
            <AnalyticsPage />
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
