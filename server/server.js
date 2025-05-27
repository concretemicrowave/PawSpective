require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const os = require("os");

const { initializeDatabase } = require("./db");
const api = require("./api/api");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api", api);

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

async function startServer() {
  await initializeDatabase();
  app.listen(PORT, "0.0.0.0", () => {
    const ip = getLocalIp();
    console.log(`Server running on http://${ip}:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
