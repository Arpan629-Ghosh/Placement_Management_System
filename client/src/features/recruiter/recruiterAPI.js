import axios from "@/services/api/axiosInstance";

// ======================================
// DASHBOARD
// ======================================

export const getRecruiterDashboardAPI = async () => {
  const res = await axios.get("/recruiter/dashboard");
  return res.data;
};

// ======================================
// PROFILE
// ======================================

export const createRecruiterProfileAPI = async (data) => {
  const res = await axios.post("/recruiter/profile", data);
  return res.data;
};

export const getRecruiterProfileAPI = async () => {
  const res = await axios.get("/recruiter/profile");
  return res.data;
};

export const updateRecruiterProfileAPI = async (data) => {
  const res = await axios.put("/recruiter/profile", data);
  return res.data;
};

export const deleteRecruiterProfileAPI = async () => {
  const res = await axios.delete("/recruiter/profile");
  return res.data;
};

// ======================================
// JOBS
// ======================================

export const createJobAPI = async (data) => {
  const res = await axios.post("/recruiter/job", data);
  return res.data;
};

export const getRecruiterJobsAPI = async () => {
  const res = await axios.get("/recruiter/job");
  return res.data;
};

export const updateJobAPI = async ({ jobId, data }) => {
  const res = await axios.put(`/recruiter/job/${jobId}`, data);
  return res.data;
};

export const deleteJobAPI = async (jobId) => {
  const res = await axios.delete(`/recruiter/job/${jobId}`);
  return res.data;
};

// ======================================
// APPLICATIONS
// ======================================

export const getApplicationsByJobAPI = async (jobId) => {
  const res = await axios.get(`/recruiter/jobs/${jobId}/applications`);
  return res.data;
};

export const updateApplicationStatusAPI = async ({ applicationId, status }) => {
  const res = await axios.patch(
    `/recruiter/applications/${applicationId}/status`,
    { status },
  );

  return res.data;
};

export const scheduleInterviewAPI = async ({
  applicationId,
  interviewData,
}) => {
  const res = await axios.post(
    `/recruiter/applications/${applicationId}/interview`,
    interviewData,
  );

  return res.data;
};
