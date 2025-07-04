require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

const initializeDatabase = async () => {
  try {
    // Optional: Reset everything
    // await pool.query(
    //   `DROP TABLE IF EXISTS posts CASCADE; DROP TABLE IF EXISTS users CASCADE;`,
    // );
    // console.log("All tables dropped.");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        breed VARCHAR(255) NOT NULL,
        weightGoal INTEGER,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        history JSONB DEFAULT '[]'::JSONB
      );
    `);

    console.log("Database initialized.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};

module.exports = { pool, initializeDatabase };
