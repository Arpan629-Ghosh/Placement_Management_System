import { createSlice } from "@reduxjs/toolkit";

import {
  getRecruiterDashboard,
  createRecruiterProfile,
  getRecruiterProfile,
  updateRecruiterProfile,
  deleteRecruiterProfile,
  createJob,
  getRecruiterJobs,
  updateJob,
  deleteJob,
  getApplicationsByJob,
  updateApplicationStatus,
  scheduleInterview,
} from "./recruiterThunks";

const initialState = {
  profile: null,
  profileFetched: false,
  dashboard: null,
  jobs: [],
  applications: [],
  loading: false,
  error: null,
  successMessage: null,
  isApproved: false,
};

const recruiterSlice = createSlice({
  name: "recruiter",

  initialState,

  reducers: {
    clearRecruiterError: (state) => {
      state.error = null;
    },

    clearRecruiterMessage: (state) => {
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    // =========================================
    // DASHBOARD
    // =========================================

    builder
      .addCase(getRecruiterDashboard.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRecruiterDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })

      .addCase(getRecruiterDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to load dashboard";
      });

    // =========================================
    // CREATE PROFILE
    // =========================================

    builder
      .addCase(createRecruiterProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = action.payload.data;
        state.profileFetched = true;

        state.successMessage = action.payload.message;
      })

      .addCase(createRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Profile creation failed";
      });

    // =========================================
    // GET PROFILE
    // =========================================

    builder
      .addCase(getRecruiterProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.profileFetched = true;
        state.isApproved = action.payload.data.approvalStatus === "approved";
      })

      .addCase(getRecruiterProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileFetched = true;
        state.error = action.payload?.message || "Failed to fetch profile";
      });

    // =========================================
    // UPDATE PROFILE
    // =========================================

    builder
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
        state.successMessage = action.payload.message;
        state.isApproved = action.payload.data.approvalStatus === "approved";
      })

      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Profile update failed";
      });

    // =========================================
    // DELETE PROFILE
    // =========================================

    builder
      .addCase(deleteRecruiterProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteRecruiterProfile.fulfilled, (state, action) => {
        state.loading = false;

        state.profile = null;
        state.profileFetched = false;

        state.successMessage = action.payload.message;
      })

      .addCase(deleteRecruiterProfile.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Delete failed";
      });

    // =========================================
    // CREATE JOB
    // =========================================

    builder
      .addCase(createJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs.unshift(action.payload.data);

        state.successMessage = action.payload.message;
      })

      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to create job";
      });

    // =========================================
    // GET JOBS
    // =========================================

    builder
      .addCase(getRecruiterJobs.pending, (state) => {
        state.loading = true;
      })

      .addCase(getRecruiterJobs.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = action.payload.jobs;
      })

      .addCase(getRecruiterJobs.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch jobs";
      });

    // =========================================
    // UPDATE JOB
    // =========================================

    builder
      .addCase(updateJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateJob.fulfilled, (state, action) => {
        state.loading = false;

        const updatedJob = action.payload.data;

        state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(updateJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to update job";
      });

    // =========================================
    // DELETE JOB
    // =========================================

    builder
      .addCase(deleteJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.loading = false;

        state.jobs = state.jobs.filter((job) => job._id !== action.meta.arg);

        state.successMessage = action.payload.message;
      })

      .addCase(deleteJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to delete job";
      });

    // =========================================
    // GET APPLICATIONS BY JOB
    // =========================================

    builder
      .addCase(getApplicationsByJob.pending, (state) => {
        state.loading = true;
      })

      .addCase(getApplicationsByJob.fulfilled, (state, action) => {
        state.loading = false;

        state.applications = action.payload.applications;
      })

      .addCase(getApplicationsByJob.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to fetch applications";
      });

    // =========================================
    // UPDATE APPLICATION STATUS
    // =========================================

    builder
      .addCase(updateApplicationStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.loading = false;

        const updatedApplication = action.payload.data;

        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to update application";
      });

    // =========================================
    // SCHEDULE INTERVIEW
    // =========================================

    builder
      .addCase(scheduleInterview.pending, (state) => {
        state.loading = true;
      })

      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.loading = false;

        const updatedApplication = action.payload.data;

        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(scheduleInterview.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to schedule interview";
      });
  },
});

export const { clearRecruiterError, clearRecruiterMessage } =
  recruiterSlice.actions;

export default recruiterSlice.reducer;
