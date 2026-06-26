import { createSlice } from "@reduxjs/toolkit";

import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  uploadResume,
  uploadProfilePicture,
  getJobs,
  applyForJob,
  getApplications,
  getApplicationDetails,
  getDashboard,
  getJobDetails,
  getApplicationStatus,
} from "./studentThunks";

const initialState = {
  profile: null,
  profileFetched: false,
  profileLoading: false,
  dashboardFetched: false,
  dashboardLoading: false,
  dashboard: {
    recentJobs: [],
    recentApplications: [],
    stats: {},
  },

  jobs: [],

  applications: [],

  applicationDetails: null,

  applicationStatus: {
    applied: false,
  },

  jobsFetched: false,
  jobsLoading: false,

  jobDetails: null,
  jobDetailsLoading: false,

  applicationsFetched: false,
  applicationsLoading: false,

  applicationStatusLoading: false,

  jobPagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalJobs: 0,
  },

  applicationPagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalApplications: 0,
  },

  loading: false,
  profilePicUploadLoading: false,
  resumeUploadLoading: false,

  error: null,

  successMessage: null,
};

const studentSlice = createSlice({
  name: "student",

  initialState,

  reducers: {
    clearStudentError: (state) => {
      state.error = null;
    },

    clearStudentMessage: (state) => {
      state.successMessage = null;
    },

    clearJobDetails: (state) => {
      state.jobDetails = null;
    },

    resetStudentState: () => initialState,
  },

  extraReducers: (builder) => {
    builder;

    // =========================================
    // DASHBOARD
    // =========================================

    builder
      .addCase(getDashboard.pending, (state) => {
        state.dashboardLoading = true;
        state.loading = true;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.loading = false;

        state.dashboard = {
          student: action.payload.student || null,
          stats: action.payload.stats || {},
          recentJobs: action.payload.recentJobs || [],
          recentApplications: action.payload.recentApplications || [],
        };
        state.dashboardFetched = true;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch dashboard";
        state.dashboardFetched = true;
      });

    // =========================================
    // CREATE PROFILE
    // =========================================

    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload.data;

        state.successMessage = action.payload.message;
      })

      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Profile creation failed";
      });

    // =========================================
    // GET PROFILE
    // =========================================

    builder
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = true;
        state.loading = true;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.loading = false;

        state.profile = action.payload.data;
        state.profileFetched = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch profile";
        state.profileFetched = true;
      });

    // =========================================
    // UPDATE PROFILE
    // =========================================

    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload.data;

        state.successMessage = action.payload.message;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Profile update failed";
      });

    // =========================================
    // DELETE PROFILE
    // =========================================

    builder
      .addCase(deleteProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = null;
        state.profileFetched = false;

        state.successMessage = action.payload.message;
      })

      .addCase(deleteProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Delete failed";
      });

    // =========================================
    // UPLOAD RESUME
    // =========================================

    builder
      .addCase(uploadResume.pending, (state) => {
        state.resumeUploadLoading = true;
      })

      .addCase(uploadResume.fulfilled, (state, action) => {
        state.resumeUploadLoading = false;

        if (state.profile) {
          state.profile.resume = action.payload.resume;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(uploadResume.rejected, (state, action) => {
        state.resumeUploadLoading = false;

        state.error = action.payload?.message || "Resume upload failed";
      });

    // =========================================
    // UPLOAD PROFILE PICTURE
    // =========================================

    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.profilePicUploadLoading = true;
      })

      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.profilePicUploadLoading = false;

        if (state.profile) {
          state.profile.profilePicture = action.payload.profilePicture;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.profilePicUploadLoading = false;

        state.error =
          action.payload?.message || "Profile picture upload failed";
      });

    // =========================================
    // GET JOBS
    // =========================================

    builder
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
        state.jobsLoading = true;
        state.error = null;
      })

      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobsLoading = false;

        state.jobs = action.payload.jobs || [];

        state.jobPagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          totalPages: action.payload.totalPages,
          totalJobs: action.payload.totalJobs,
        };

        state.jobsFetched = true;
      })

      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.jobsLoading = false;

        state.error = action.payload?.message || "Failed to fetch jobs";
      });
    builder
      .addCase(getJobDetails.pending, (state) => {
        state.jobDetailsLoading = true;
        state.error = null;
      })

      .addCase(getJobDetails.fulfilled, (state, action) => {
        state.jobDetailsLoading = false;
        state.jobDetails = action.payload.job;
      })

      .addCase(getJobDetails.rejected, (state, action) => {
        state.jobDetailsLoading = false;
        state.error = action.payload?.message || "Failed to fetch job details";
      });

    // =========================================
    // APPLY FOR JOB
    // =========================================

    builder
      .addCase(applyForJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(applyForJob.fulfilled, (state, action) => {
        state.loading = false;

        state.applications.unshift(action.payload.application);

        state.successMessage = action.payload.message;
      })

      .addCase(applyForJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Application failed";
      });

    // =========================================
    // GET APPLICATIONS
    // =========================================

    builder
      .addCase(getApplications.pending, (state) => {
        state.applicationsLoading = true;
      })

      .addCase(getApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;

        state.applications = action.payload.applications;

        state.applicationPagination = {
          page: action.payload.pagination.currentPage,
          totalPages: action.payload.pagination.totalPages,
          totalApplications: action.payload.pagination.totalApplications,
          limit: 10,
        };

        state.applicationsFetched = true;
      })

      .addCase(getApplications.rejected, (state, action) => {
        state.applicationStatusLoading = false;

        state.error = action.payload?.message || "Failed to fetch applications";
      });

    // =========================================
    // GET APPLICATION DETAILS
    // =========================================

    builder
      .addCase(getApplicationDetails.pending, (state) => {
        state.applicationsLoading = true;
      })

      .addCase(getApplicationDetails.fulfilled, (state, action) => {
        state.applicationsLoading = false;

        state.applicationDetails = action.payload.application;
      })

      .addCase(getApplicationDetails.rejected, (state, action) => {
        state.applicationsLoading = false;

        state.error =
          action.payload?.message || "Failed to fetch application details";
      });

    // =========================================
    // GET APPLICATION STATUS
    // =========================================

    builder
      .addCase(getApplicationStatus.pending, (state) => {
        state.applicationStatusLoading = true;
      })

      .addCase(getApplicationStatus.fulfilled, (state, action) => {
        state.applicationStatusLoading = false;

        state.applicationStatus = {
          applied: action.payload.applied,
        };
      })

      .addCase(getApplicationStatus.rejected, (state, action) => {
        state.applicationStatusLoading = false;

        state.error =
          action.payload?.message || "Failed to fetch application status";
      });
  },
});

export const {
  clearStudentError,
  clearStudentMessage,
  clearJobDetails,
  resetStudentState,
} = studentSlice.actions;

export default studentSlice.reducer;
