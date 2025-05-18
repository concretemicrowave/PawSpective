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
async function startServer() {
  await initializeDatabase();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
