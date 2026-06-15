import axios from "@/services/api/axiosInstance";

// ==============================
// DASHBOARD
// ==============================

export const getDashboardAPI = async () => {
  const res = await axios.get("/student/dashboard");

  return res.data;
};

// ==============================
// PROFILE APIs
// ==============================

export const createProfileAPI = async (data) => {
  const res = await axios.post("/student/profile", data);
  return res.data;
};

export const getProfileAPI = async () => {
  const res = await axios.get("/student/profile");
  return res.data;
};

export const updateProfileAPI = async (data) => {
  const res = await axios.put("/student/profile", data);
  return res.data;
};

export const deleteProfileAPI = async () => {
  const res = await axios.delete("/student/profile");
  return res.data;
};

// ==============================
// RESUME
// ==============================

export const uploadResumeAPI = async (formData) => {
  const res = await axios.post("/student/upload-resume", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ==============================
// PROFILE PICTURE
// ==============================

export const uploadProfilePictureAPI = async (formData) => {
  const res = await axios.post("/student/upload-profile-picture", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// ==============================
// JOBS
// ==============================

export const getJobsAPI = async ({
  page = 1,
  limit = 10,
  search = "",
  jobType = "",
  location = "",
  sortBy = "latest",
}) => {
  const res = await axios.get("/student/jobs", {
    params: {
      page,
      limit,
      search,
      jobType,
      location,
      sortBy,
    },
  });

  return res.data;
};

export const getJobDetailsAPI = async (jobId) => {
  const res = await axios.get(`/student/jobs/${jobId}`);

  return res.data;
};

export const applyForJobAPI = async (jobId) => {
  const res = await axios.post(`/student/apply/${jobId}`);
  return res.data;
};

// ==============================
// APPLICATIONS
// ==============================

export const getApplicationsAPI = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/student/applications", {
    params: {
      page,
      limit,
    },
  });

  return res.data;
};

export const getApplicationDetailsAPI = async (applicationId) => {
  const res = await axios.get(`/student/applications/${applicationId}`);

  return res.data;
};
