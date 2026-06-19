import { createSlice } from "@reduxjs/toolkit";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "./notificationThunks";

const initialState = {
  notifications: [],

  unreadCount: 0,

  loading: false,

  error: null,

  fetched: false,
};

const notificationSlice = createSlice({
  name: "notification",

  initialState,

  reducers: {
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      state.fetched = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // =====================
      // GET NOTIFICATIONS
      // =====================

      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;

        state.notifications = action.payload.notifications || [];

        state.unreadCount = action.payload.unreadCount || 0;

        state.fetched = true;
      })

      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload?.message || "Failed to load notifications";
      })

      // =====================
      // MARK SINGLE READ
      // =====================

      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (item) => item._id === action.payload,
        );

        if (notification && !notification.isRead) {
          notification.isRead = true;

          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })

      // =====================
      // MARK ALL READ
      // =====================

      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((item) => {
          item.isRead = true;
        });

        state.unreadCount = 0;
      });
  },
});

export const { clearNotifications } = notificationSlice.actions;

export default notificationSlice.reducer;
