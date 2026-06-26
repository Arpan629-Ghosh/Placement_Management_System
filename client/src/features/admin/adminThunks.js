import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAdminDashboardAPI,
  getDashboardStatsAPI,
  getGraphAnalyticsAPI,
  getRecruitersAPI,
  approveRecruiterAPI,
  rejectRecruiterAPI,
  getUsersAPI,
  updateUserStatusAPI,
  generateReportAPI,
  getReportsAPI,
} from "./adminAPI";

// ======================================
// DASHBOARD
// ======================================

export const getAdminDashboard = createAsyncThunk(
  "admin/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminDashboardAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getDashboardStats = createAsyncThunk(
  "admin/getDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboardStatsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getGraphAnalytics = createAsyncThunk(
  "admin/getGraphAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      return await getGraphAnalyticsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// RECRUITER APPROVALS
// ======================================

export const getRecruiters = createAsyncThunk(
  "admin/getRecruiters",
  async (_, { rejectWithValue }) => {
    try {
      return await getRecruitersAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const approveRecruiter = createAsyncThunk(
  "admin/approveRecruiter",
  async (recruiterId, { rejectWithValue }) => {
    try {
      return await approveRecruiterAPI(recruiterId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const rejectRecruiter = createAsyncThunk(
  "admin/rejectRecruiter",
  async (recruiterId, { rejectWithValue }) => {
    try {
      return await rejectRecruiterAPI(recruiterId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// USER MANAGEMENT
// ======================================

export const getUsers = createAsyncThunk(
  "admin/getUsers",
  async (params, { rejectWithValue }) => {
    try {
      return await getUsersAPI(params);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateUserStatus = createAsyncThunk(
  "admin/updateUserStatus",
  async (data, { rejectWithValue }) => {
    try {
      return await updateUserStatusAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// REPORTS
// ======================================

export const generateReport = createAsyncThunk(
  "admin/generateReport",
  async (_, { rejectWithValue }) => {
    try {
      return await generateReportAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getReports = createAsyncThunk(
  "admin/getReports",
  async (_, { rejectWithValue }) => {
    try {
      return await getReportsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
