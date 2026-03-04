import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1️. Check header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // 2️. Extract token
    const token = authHeader.split(" ")[1];

    // 3️. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️. Fetch user from DB (IMPORTANT)
    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    // 5️. Check if user is blocked
    if (user.status === "blocked") {
      return res.status(403).json({
        success: false,
        message: "Your account is blocked",
      });
    }

    // 6️. Attach full user to request
    req.user = user;

    next();
  } catch (error) {
    console.error("FULL ERROR:", error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
