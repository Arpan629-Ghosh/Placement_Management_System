import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/api/axiosInstance";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/auth/register", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// VERIFY EMAIL (OTP)
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/auth/verify-email", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// RESEND OTP
export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async (email, thunkAPI) => {
    try {
      const res = await axios.post("/auth/resend-otp", { email });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post("/auth/logout");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// FORGOT PASSWORD
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, thunkAPI) => {
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// VERIFY RESET OTP
export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/auth/verify-reset-otp", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

// RESET PASSWORD
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post("/auth/reset-password", data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/auth/me");
      return res.data.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);
