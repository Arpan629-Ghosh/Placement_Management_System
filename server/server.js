import "./config/env.js";
import express from "express";
import cors from "cors";
import "./utils/cron.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import studentRoutes from "./routes/student/studentRoutes.js";
import recruiterRoutes from "./routes/recruiter/recruiterRoutes.js";
import notificationRoutes from "./routes/notification/notificationRoutes.js";
import path from "path";

// Connect Database
connectDB();
//Initialize express server
const app = express();

//Middleware
const allowedOrigins = ["http://localhost:5173", process.env.CLIENT_URL];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json()); // Parse JSON req body

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//test route
app.get("/", (req, res) => {
  res.send("Placement Management System Server is runnung");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);
app.use("/api/notifications", notificationRoutes);

//Server Port
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
