export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Admin only",
    });
  }
  next();
};

export const isStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Student only",
    });
  }
  next();
};

export const isRecruiter = (req, res, next) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({
      success: false,
      message: "Access denied: Recruiter only",
    });
  }

  if (req.user.status !== "active") {
    return res.status(403).json({
      success: false,
      message: "Not approved by admin",
    });
  }
  next();
};
