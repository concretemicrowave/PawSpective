require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const os = require("os");
const fs = require("fs");
const path = require("path");

const { initializeDatabase } = require("./db");
// ← now point at your new `routes/index.js`
const apiRouter = require("./routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Enable CORS for all routes ───────────────────────
app.use(cors());

// ─── Middleware for your JSON API ─────────────────────
app.use(bodyParser.json());
// mount all your modular routes under /api
app.use("/api", apiRouter);

// ─── In‑memory frame buffer + placeholder.jpg ──────────
let latestFrame = null;
const placeholderPath = path.join(__dirname, "placeholder.jpg");
let placeholderBuffer = null;
if (fs.existsSync(placeholderPath)) {
  placeholderBuffer = fs.readFileSync(placeholderPath);
  console.log(
    `[Server] Loaded placeholder.jpg (${placeholderBuffer.length} bytes)`,
  );
}

// ─── POST /upload — receive raw JPEGs ──────────────────
app.post(
  "/upload",
  express.raw({ type: "image/jpeg", limit: "10mb" }),
  (req, res) => {
    if (!req.body || !req.body.length) {
      return res.status(400).send("No data received");
    }
    latestFrame = Buffer.from(req.body);
    console.log(`[Server] /upload len=${latestFrame.length} bytes`);
    res.sendStatus(200);
  },
);

// ─── GET /stream — serve MJPEG ─────────────────────────
app.get("/stream", (req, res) => {
  console.log("[Server] /stream client connected");
  res.writeHead(200, {
    "Content-Type": "multipart/x-mixed-replace; boundary=frame",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });

  const writeFrame = () => {
    const frame = latestFrame || placeholderBuffer;
    if (frame) {
      res.write("--frame\r\nContent-Type: image/jpeg\r\n\r\n");
      res.write(frame);
      res.write("\r\n");
    }
  };

  const intervalId = setInterval(writeFrame, 33);
  req.on("close", () => {
    clearInterval(intervalId);
    console.log("[Server] /stream client disconnected");
  });
});

// ─── GET /latest.jpg — one snapshot ────────────────────
app.get("/latest.jpg", (req, res) => {
  const frame = latestFrame || placeholderBuffer;
  if (!frame) return res.status(404).send("No image available");
  res.writeHead(200, {
    "Content-Type": "image/jpeg",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  res.end(frame);
});

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
