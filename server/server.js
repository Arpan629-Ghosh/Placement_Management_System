import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/admin/adminRoutes.js";
// Load environment variables from .env file
dotenv.config();

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

//Server Port
const PORT = process.env.PORT || 5000;

//Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
