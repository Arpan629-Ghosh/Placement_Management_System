import { createSlice } from "@reduxjs/toolkit";

import {
  getAdminDashboard,
  getDashboardStats,
  getGraphAnalytics,
  getRecruiters,
  approveRecruiter,
  rejectRecruiter,
  getUsers,
  updateUserStatus,
  generateReport,
  getReports,
} from "./adminThunks";

const initialState = {
  loading: false,
  recruiterApprovalLoading: false,
  error: null,

  dashboard: null,
  stats: null,
  analytics: null,

  recruiters: [],

  users: [],

  reports: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // ======================================
      // DASHBOARD
      // ======================================

      .addCase(getAdminDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(getAdminDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.stats = action.payload.data;
      })

      .addCase(getGraphAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload.data;
      })

      // ======================================
      // RECRUITERS
      // ======================================

      .addCase(getRecruiters.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRecruiters.fulfilled, (state, action) => {
        state.loading = false;
        state.recruiters = action.payload.recruiters;
      })
      .addCase(getRecruiters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(approveRecruiter.pending, (state) => {
        state.recruiterApprovalLoading = true;
      })

      .addCase(approveRecruiter.fulfilled, (state) => {
        state.recruiterApprovalLoading = false;
        // refresh by re-fetching recruiters
      })
      .addCase(approveRecruiter.rejected, (state, action) => {
        state.recruiterApprovalLoading = false;
        state.error = action.payload?.message;
      })

      .addCase(rejectRecruiter.pending, (state) => {
        state.recruiterApprovalLoading = true;
      })

      .addCase(rejectRecruiter.fulfilled, (state) => {
        state.recruiterApprovalLoading = false;
        // refresh by re-fetching recruiters
      })
      .addCase(rejectRecruiter.rejected, (state, action) => {
        state.recruiterApprovalLoading = false;
        state.error = action.payload?.message;
      })

      // ======================================
      // USERS
      // ======================================

      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;

        state.users = state.users.map((user) =>
          user._id === updatedUser._id ? updatedUser : user,
        );
      })

      // ======================================
      // REPORTS
      // ======================================

      .addCase(generateReport.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateReport.fulfilled, (state, action) => {
        state.loading = false;

        state.reports.unshift(action.payload.report);
      })
      .addCase(generateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      .addCase(getReports.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReports.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = action.payload.reports;
      })
      .addCase(getReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default adminSlice.reducer;
