import "./config/env.js";
import express from "express";
import cors from "cors";
import "./utils/cron.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
import studentRoutes from "./routes/student/studentRoutes.js";
import recruiterRoutes from "./routes/recruiter/recruiterRoutes.js";

// Connect Database
connectDB();
//Initialize express server
const app = express();

//Middleware
app.use(cors()); // Enables CORS (frontend-bakend connection)
app.use(express.json()); // Parse JSON req body

//test route
app.get("/", (req, res) => {
  res.send("Placement Management System Server is runnung");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/recruiter", recruiterRoutes);

//Server Port
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
