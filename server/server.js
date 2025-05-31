require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");

const { initializeDatabase } = require("./db");
const routes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware for your JSON API ─────────────────────
app.use(bodyParser.json());
app.use("/api", routes);

// ─── Utility to get your LAN IP ────────────────────────
function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "localhost";
}

// ─── Start everything ──────────────────────────────────
async function startServer() {
  try {
    await initializeDatabase();
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on http://${getLocalIp()}:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

startServer();
