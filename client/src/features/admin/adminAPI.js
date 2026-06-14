import axios from "@/services/api/axiosInstance";

// ======================================
// DASHBOARD
// ======================================

export const getAdminDashboardAPI = async () => {
  const res = await axios.get("/admin/dashboard");
  return res.data;
};

export const getDashboardStatsAPI = async () => {
  const res = await axios.get("/admin/stats");
  return res.data;
};

export const getGraphAnalyticsAPI = async () => {
  const res = await axios.get("/admin/reports/graph");
  return res.data;
};

// ======================================
// RECRUITER APPROVALS
// ======================================

export const getRecruitersAPI = async () => {
  const res = await axios.get("/admin/recruiters/all");
  return res.data;
};

export const approveRecruiterAPI = async (recruiterId) => {
  const res = await axios.patch(`/admin/recruiters/${recruiterId}/approve`);

  return res.data;
};

export const rejectRecruiterAPI = async (recruiterId) => {
  const res = await axios.patch(`/admin/recruiters/${recruiterId}/reject`);

  return res.data;
};

// ======================================
// USER MANAGEMENT
// ======================================

export const getUsersAPI = async (params = {}) => {
  const query = new URLSearchParams(params).toString();

  const res = await axios.get(`/admin/manage/users${query ? `?${query}` : ""}`);

  return res.data;
};

export const updateUserStatusAPI = async ({ userId, status }) => {
  const res = await axios.patch(`/admin/manage/user/${userId}`, { status });

  return res.data;
};

// ======================================
// REPORTS
// ======================================

export const generateReportAPI = async () => {
  const res = await axios.post("/admin/reports/generate");

  return res.data;
};

export const getReportsAPI = async () => {
  const res = await axios.get("/admin/reports");

  return res.data;
};
