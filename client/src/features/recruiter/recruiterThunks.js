import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getRecruiterDashboardAPI,
  createRecruiterProfileAPI,
  getRecruiterProfileAPI,
  updateRecruiterProfileAPI,
  deleteRecruiterProfileAPI,
  createJobAPI,
  getRecruiterJobsAPI,
  updateJobAPI,
  deleteJobAPI,
  getApplicationsByJobAPI,
  updateApplicationStatusAPI,
  scheduleInterviewAPI,
  getRecruiterApplicationDetailsAPI,
  getAllApplicationsAPI,
  getAllInterviewsAPI,
  getRankedApplicantsAPI,
} from "./recruiterAPI";

// ======================================
// DASHBOARD
// ======================================

export const getRecruiterDashboard = createAsyncThunk(
  "recruiter/getRecruiterDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getRecruiterDashboardAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// PROFILE
// ======================================

export const createRecruiterProfile = createAsyncThunk(
  "recruiter/createRecruiterProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await createRecruiterProfileAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getRecruiterProfile = createAsyncThunk(
  "recruiter/getRecruiterProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getRecruiterProfileAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateRecruiterProfile = createAsyncThunk(
  "recruiter/updateRecruiterProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await updateRecruiterProfileAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteRecruiterProfile = createAsyncThunk(
  "recruiter/deleteRecruiterProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await deleteRecruiterProfileAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// JOBS
// ======================================

export const createJob = createAsyncThunk(
  "recruiter/createJob",
  async (data, { rejectWithValue }) => {
    try {
      return await createJobAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getRecruiterJobs = createAsyncThunk(
  "recruiter/getRecruiterJobs",
  async (_, { rejectWithValue }) => {
    console.log("API HIT");
    try {
      return await getRecruiterJobsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateJob = createAsyncThunk(
  "recruiter/updateJob",
  async ({ jobId, data }, { rejectWithValue }) => {
    try {
      return await updateJobAPI({ jobId, data });
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const deleteJob = createAsyncThunk(
  "recruiter/deleteJob",
  async (jobId, { rejectWithValue }) => {
    try {
      return await deleteJobAPI(jobId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// APPLICATIONS
// ======================================

export const getApplicationsByJob = createAsyncThunk(
  "recruiter/getApplicationsByJob",
  async (jobId, { rejectWithValue }) => {
    try {
      return await getApplicationsByJobAPI(jobId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const updateApplicationStatus = createAsyncThunk(
  "recruiter/updateApplicationStatus",
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      return await updateApplicationStatusAPI({
        applicationId,
        status,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const scheduleInterview = createAsyncThunk(
  "recruiter/scheduleInterview",
  async ({ applicationId, interviewData }, { rejectWithValue }) => {
    try {
      return await scheduleInterviewAPI({
        applicationId,
        interviewData,
      });
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getRecruiterApplicationDetails = createAsyncThunk(
  "recruiter/getRecruiterApplicationDetails",
  async (applicationId, { rejectWithValue }) => {
    try {
      return await getRecruiterApplicationDetailsAPI(applicationId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
export const getAllApplications = createAsyncThunk(
  "recruiter/getAllApplications",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllApplicationsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getAllInterviews = createAsyncThunk(
  "recruiter/getAllInterviews",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllInterviewsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ============================================
// AI Candidate Ranking
// ============================================

export const getRankedApplicants = createAsyncThunk(
  "recruiter/getRankedApplicants",
  async (jobId, thunkAPI) => {
    try {
      return await getRankedApplicantsAPI(jobId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Failed to fetch ranked candidates",
        },
      );
    }
  },
);
