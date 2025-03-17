require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Import API routes and pass `pool`
const api = require("./api/api")(pool);

// Configuration
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);
    console.log("Database initialized");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

// Routes
app.use("/api", api);

// Start server
app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server running on http://192.168.86.43:${PORT}`);
});
