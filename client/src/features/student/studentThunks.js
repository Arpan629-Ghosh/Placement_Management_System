import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createProfileAPI,
  getProfileAPI,
  updateProfileAPI,
  deleteProfileAPI,
  uploadResumeAPI,
  uploadProfilePictureAPI,
  getJobsAPI,
  applyForJobAPI,
  getApplicationsAPI,
  getApplicationDetailsAPI,
  getDashboardAPI,
  getJobDetailsAPI,
} from "./studentApi";

// ======================================
// DASHBOARD
// ======================================

export const getDashboard = createAsyncThunk(
  "student/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      return await getDashboardAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// CREATE PROFILE
// ======================================

export const createProfile = createAsyncThunk(
  "student/createProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await createProfileAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// GET PROFILE
// ======================================

export const getProfile = createAsyncThunk(
  "student/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getProfileAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// UPDATE PROFILE
// ======================================

export const updateProfile = createAsyncThunk(
  "student/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      return await updateProfileAPI(data);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// DELETE PROFILE
// ======================================

export const deleteProfile = createAsyncThunk(
  "student/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await deleteProfileAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// UPLOAD RESUME
// ======================================

export const uploadResume = createAsyncThunk(
  "student/uploadResume",
  async (formData, { rejectWithValue }) => {
    try {
      return await uploadResumeAPI(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// UPLOAD PROFILE PICTURE
// ======================================

export const uploadProfilePicture = createAsyncThunk(
  "student/uploadProfilePicture",
  async (formData, { rejectWithValue }) => {
    try {
      return await uploadProfilePictureAPI(formData);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// GET JOBS
// ======================================

export const getJobs = createAsyncThunk(
  "student/getJobs",
  async (params, { rejectWithValue }) => {
    try {
      return await getJobsAPI(params);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

export const getJobDetails = createAsyncThunk(
  "student/getJobDetails",
  async (jobId, { rejectWithValue }) => {
    try {
      return await getJobDetailsAPI(jobId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// APPLY FOR JOB
// ======================================

export const applyForJob = createAsyncThunk(
  "student/applyForJob",
  async (jobId, { rejectWithValue }) => {
    try {
      return await applyForJobAPI(jobId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// GET APPLICATIONS
// ======================================

export const getApplications = createAsyncThunk(
  "student/getApplications",
  async (params, { rejectWithValue }) => {
    try {
      return await getApplicationsAPI(params);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ======================================
// GET APPLICATION DETAILS
// ======================================

export const getApplicationDetails = createAsyncThunk(
  "student/getApplicationDetails",
  async (applicationId, { rejectWithValue }) => {
    try {
      return await getApplicationDetailsAPI(applicationId);
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
