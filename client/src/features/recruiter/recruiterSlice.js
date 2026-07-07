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
  getRecruiterApplicationDetails,
  getAllApplications,
  getAllInterviews,
  getRankedApplicants,
} from "./recruiterThunks";

const initialState = {
  profile: null,
  profileFetched: false,

  dashboard: null,

  jobs: [],
  applications: [],
  interviews: [],

  error: null,
  successMessage: null,

  isApproved: false,
  applicationDetails: null,

  rankedCandidates: [],
  rankedCandidatesLoading: false,
  totalApplicants: 0,
  analyzedCandidates: 0,

  applicationDetailsLoading: false,
  applicationsFetched: false,
  statusUpdateLoading: false,

  profileLoading: false,
  dashboardLoading: false,
  jobsLoading: false,
  applicationsLoading: false,
  interviewLoading: false,
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

    clearApplicationDetails: (state) => {
      state.applicationDetails = null;
    },

    resetRecruiterState: () => initialState,
  },

  extraReducers: (builder) => {
    // =========================================
    // DASHBOARD
    // =========================================

    builder
      .addCase(getRecruiterDashboard.pending, (state) => {
        state.dashboardLoading = true;
      })

      .addCase(getRecruiterDashboard.fulfilled, (state, action) => {
        state.dashboardLoading = false;
        state.dashboard = action.payload;
      })

      .addCase(getRecruiterDashboard.rejected, (state, action) => {
        state.dashboardLoading = false;
        state.error = action.payload?.message || "Failed to load dashboard";
      });

    // =========================================
    // CREATE PROFILE
    // =========================================

    builder
      .addCase(createRecruiterProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })

      .addCase(createRecruiterProfile.fulfilled, (state, action) => {
        state.profileLoading = false;

        state.profile = action.payload.data;
        state.profileFetched = true;

        state.successMessage = action.payload.message;
      })

      .addCase(createRecruiterProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload?.message || "Profile creation failed";
      });

    // =========================================
    // GET PROFILE
    // =========================================

    builder
      .addCase(getRecruiterProfile.pending, (state) => {
        state.profileLoading = true;
      })

      .addCase(getRecruiterProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload.data;
        state.profileFetched = true;
        state.isApproved = action.payload.data.approvalStatus === "approved";
      })

      .addCase(getRecruiterProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.profileFetched = true;
        state.error = action.payload?.message || "Failed to fetch profile";
      });

    // =========================================
    // UPDATE PROFILE
    // =========================================

    builder
      .addCase(updateRecruiterProfile.pending, (state) => {
        state.profileLoading = true;
      })

      .addCase(updateRecruiterProfile.fulfilled, (state, action) => {
        state.profileLoading = false;
        state.profile = action.payload.data;
        state.successMessage = action.payload.message;
        state.isApproved = action.payload.data.approvalStatus === "approved";
      })

      .addCase(updateRecruiterProfile.rejected, (state, action) => {
        state.profileLoading = false;

        state.error = action.payload?.message || "Profile update failed";
      });

    // =========================================
    // DELETE PROFILE
    // =========================================

    builder
      .addCase(deleteRecruiterProfile.pending, (state) => {
        state.profileLoading = true;
        // console.log("PROFILE PENDING");
      })

      .addCase(deleteRecruiterProfile.fulfilled, (state, action) => {
        state.profileLoading = false;

        state.profile = null;
        state.profileFetched = false;

        state.successMessage = action.payload.message;
        state.jobs = [];
        state.applications = [];
        state.interviews = [];
        state.applicationDetails = null;
        state.dashboard = null;
        // console.log("PROFILE FULFILLED");
      })

      .addCase(deleteRecruiterProfile.rejected, (state, action) => {
        state.profileLoading = false;
        // console.log("PROFILE REJECTED");

        state.error = action.payload?.message || "Delete failed";
      });

    // =========================================
    // CREATE JOB
    // =========================================

    builder
      .addCase(createJob.pending, (state) => {
        state.jobsLoading = true;
      })

      .addCase(createJob.fulfilled, (state, action) => {
        state.jobsLoading = false;

        state.jobs.unshift(action.payload.data);

        state.successMessage = action.payload.message;
      })

      .addCase(createJob.rejected, (state, action) => {
        state.jobsLoading = false;

        state.error = action.payload?.message || "Failed to create job";
      });

    // =========================================
    // GET JOBS
    // =========================================

    builder
      .addCase(getRecruiterJobs.pending, (state) => {
        state.jobsLoading = true;
      })

      .addCase(getRecruiterJobs.fulfilled, (state, action) => {
        state.jobsLoading = false;

        state.jobs = action.payload.jobs;
      })

      .addCase(getRecruiterJobs.rejected, (state, action) => {
        state.jobsLoading = false;

        state.error = action.payload?.message || "Failed to fetch jobs";
      });

    // =========================================
    // UPDATE JOB
    // =========================================

    builder
      .addCase(updateJob.pending, (state) => {
        state.jobsLoading = true;
      })

      .addCase(updateJob.fulfilled, (state, action) => {
        state.jobsLoading = false;

        const updatedJob = action.payload.data;

        state.jobs = state.jobs.map((job) =>
          job._id === updatedJob._id ? updatedJob : job,
        );

        state.successMessage = action.payload.message;
      })

      .addCase(updateJob.rejected, (state, action) => {
        state.jobsLoading = false;

        state.error = action.payload?.message || "Failed to update job";
      });

    // =========================================
    // DELETE JOB
    // =========================================

    builder
      .addCase(deleteJob.pending, (state) => {
        state.jobsLoading = true;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobsLoading = false;

        state.jobs = state.jobs.filter((job) => job._id !== action.meta.arg);

        state.successMessage = action.payload.message;
      })

      .addCase(deleteJob.rejected, (state, action) => {
        state.jobsLoading = false;

        state.error = action.payload?.message || "Failed to delete job";
      });

    // =========================================
    // GET APPLICATIONS BY JOB
    // =========================================

    builder
      .addCase(getApplicationsByJob.pending, (state) => {
        state.applicationsLoading = true;
      })

      .addCase(getApplicationsByJob.fulfilled, (state, action) => {
        state.applicationsLoading = false;

        state.applications = action.payload.applications;
        state.applicationsFetched = true;
      })

      .addCase(getApplicationsByJob.rejected, (state, action) => {
        state.applicationsLoading = false;

        state.error = action.payload?.message || "Failed to fetch applications";
        state.applicationsFetched = true;
      });

    // =========================================
    // UPDATE APPLICATION STATUS
    // =========================================

    builder
      .addCase(updateApplicationStatus.pending, (state) => {
        state.statusUpdateLoading = true;
      })

      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        state.statusUpdateLoading = false;

        const updatedApplication = action.payload.data;

        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );
        state.interviews = state.interviews.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );

        if (state.applicationDetails?._id === updatedApplication._id) {
          state.applicationDetails = updatedApplication;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateApplicationStatus.rejected, (state, action) => {
        state.statusUpdateLoading = false;

        state.error = action.payload?.message || "Failed to update application";
      });

    // =========================================
    // SCHEDULE INTERVIEW
    // =========================================

    builder
      .addCase(scheduleInterview.pending, (state) => {
        state.interviewLoading = true;
      })

      .addCase(scheduleInterview.fulfilled, (state, action) => {
        state.interviewLoading = false;

        const updatedApplication = action.payload.data;

        state.applications = state.applications.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );
        state.interviews = state.interviews.map((app) =>
          app._id === updatedApplication._id ? updatedApplication : app,
        );

        if (state.applicationDetails?._id === updatedApplication._id) {
          state.applicationDetails = updatedApplication;
        }

        state.successMessage = action.payload.message;
      })

      .addCase(scheduleInterview.rejected, (state, action) => {
        state.interviewLoading = false;

        state.error = action.payload?.message || "Failed to schedule interview";
      });

    builder
      .addCase(getRecruiterApplicationDetails.pending, (state) => {
        state.applicationDetailsLoading = true;
        state.applicationDetails = null;
      })

      .addCase(getRecruiterApplicationDetails.fulfilled, (state, action) => {
        state.applicationDetailsLoading = false;

        state.applicationDetails = action.payload.application;
      })

      .addCase(getRecruiterApplicationDetails.rejected, (state, action) => {
        state.applicationDetailsLoading = false;

        state.error =
          action.payload?.message || "Failed to fetch application details";
      });

    builder
      .addCase(getAllApplications.pending, (state) => {
        state.applicationsLoading = true;
      })

      .addCase(getAllApplications.fulfilled, (state, action) => {
        state.applicationsLoading = false;

        state.applications = action.payload.applications;
        state.applicationsFetched = true;
      })

      .addCase(getAllApplications.rejected, (state, action) => {
        state.applicationsLoading = false;
        state.applicationsFetched = true;

        state.error = action.payload?.message || "Failed to fetch applications";
      });

    builder
      .addCase(getAllInterviews.pending, (state) => {
        state.interviewLoading = true;
      })

      .addCase(getAllInterviews.fulfilled, (state, action) => {
        state.interviewLoading = false;

        state.interviews = action.payload.interviews;
      })

      .addCase(getAllInterviews.rejected, (state, action) => {
        state.interviewLoading = false;

        state.error = action.payload?.message || "Failed to fetch interviews";
      });
    // =======================================
    // AI Candidate Ranking
    // =======================================

    builder
      .addCase(getRankedApplicants.pending, (state) => {
        state.rankedCandidatesLoading = true;
      })

      .addCase(getRankedApplicants.fulfilled, (state, action) => {
        state.rankedCandidatesLoading = false;

        state.rankedCandidates = action.payload.rankedCandidates || [];

        state.totalApplicants = action.payload.totalApplicants || 0;

        state.analyzedCandidates = action.payload.analyzedCandidates || 0;
      })

      .addCase(getRankedApplicants.rejected, (state) => {
        state.rankedCandidatesLoading = false;
      });
  },
});

export const {
  clearRecruiterError,
  clearRecruiterMessage,
  clearApplicationDetails,
  resetRecruiterState,
} = recruiterSlice.actions;

export default recruiterSlice.reducer;
