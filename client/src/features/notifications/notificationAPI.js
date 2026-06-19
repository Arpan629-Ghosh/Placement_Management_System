import axios from "@/services/api/axiosInstance";

export const getNotificationsAPI = async () => {
  const res = await axios.get("/notifications");
  return res.data;
};

export const markNotificationReadAPI = async (notificationId) => {
  const res = await axios.patch(`/notifications/${notificationId}/read`);

  return res.data;
};

export const markAllNotificationsReadAPI = async () => {
  const res = await axios.patch("/notifications/read-all");

  return res.data;
};
