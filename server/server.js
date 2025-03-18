require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { initializeDatabase } = require("./db");
const api = require("./api/api");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", api);

// Start server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on http://192.168.86.43:${PORT}`);
});
