const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const missionRoutes = require("./routes/missionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const habitRoutes = require("./routes/habitRoutes");
// Load environment variables
dotenv.config();

// Connect Database
connectDB();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/missions", missionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/habits", habitRoutes);
// Test Route
app.get("/", (req, res) => {
    res.send("🚀 ASCENT Backend is Running...");
});

// Server Port
const PORT = process.env.PORT || 5000;
const startCronJobs = require('./utils/cronJobs');
startCronJobs();

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});