import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getNotificationsAPI,
  markNotificationReadAPI,
  markAllNotificationsReadAPI,
} from "./notificationAPI";

// =====================
// GET NOTIFICATIONS
// =====================

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",

  async (_, { rejectWithValue }) => {
    try {
      return await getNotificationsAPI();
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================
// MARK SINGLE READ
// =====================

export const markNotificationRead = createAsyncThunk(
  "notification/markNotificationRead",

  async (notificationId, { rejectWithValue }) => {
    try {
      await markNotificationReadAPI(notificationId);

      return notificationId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// =====================
// MARK ALL READ
// =====================

export const markAllNotificationsRead = createAsyncThunk(
  "notification/markAllNotificationsRead",

  async (_, { rejectWithValue }) => {
    try {
      await markAllNotificationsReadAPI();

      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);
