const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const healthRoutes = require("./routes/healthRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/health", healthRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});