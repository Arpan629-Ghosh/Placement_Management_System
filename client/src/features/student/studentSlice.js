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
} from "./studentThunks";

const initialState = {
  profile: null,
  profileFetched: false,
  dashboard: {
    recentJobs: [],
    recentApplications: [],
    stats: {},
  },

  jobs: [],

  applications: [],

  applicationDetails: null,

  loading: false,

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
  },

  extraReducers: (builder) => {
    builder;

    // =========================================
    // DASHBOARD
    // =========================================

    builder
      .addCase(getDashboard.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDashboard.fulfilled, (state, action) => {
        state.loading = false;

        state.dashboard = action.payload.data;
      })

      .addCase(getDashboard.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch dashboard";
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
        state.loading = true;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload.data;
        state.profileFetched = true;
      })

      .addCase(getProfile.rejected, (state, action) => {
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
        state.loading = true;
      })

      .addCase(uploadResume.fulfilled, (state, action) => {
        state.loading = false;

        if (state.profile) {
          state.profile.resume = action.payload.resume;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(uploadResume.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Resume upload failed";
      });

    // =========================================
    // UPLOAD PROFILE PICTURE
    // =========================================

    builder
      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
      })

      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;

        if (state.profile) {
          state.profile.profilePicture = action.payload.profilePicture;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message || "Profile picture upload failed";
      });

    // =========================================
    // GET JOBS
    // =========================================

    builder
      .addCase(getJobs.pending, (state) => {
        state.loading = true;
      })

      .addCase(getJobs.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = action.payload.jobs;
      })

      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch jobs";
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
        state.loading = true;
      })

      .addCase(getApplications.fulfilled, (state, action) => {
        state.loading = false;

        state.applications = action.payload.applications;
      })

      .addCase(getApplications.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch applications";
      });

    // =========================================
    // GET APPLICATION DETAILS
    // =========================================

    builder
      .addCase(getApplicationDetails.pending, (state) => {
        state.loading = true;
      })

      .addCase(getApplicationDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.applicationDetails = action.payload.application;
      })

      .addCase(getApplicationDetails.rejected, (state, action) => {
        state.loading = false;

        state.error =
          action.payload?.message || "Failed to fetch application details";
      });
  },
});

export const { clearStudentError, clearStudentMessage } = studentSlice.actions;

export default studentSlice.reducer;
