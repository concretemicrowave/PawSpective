const express = require("express");
const util = require("../util/util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const { pool } = require("../db");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

let api = express.Router();

console.log("Loading API...");

api.get("/", (req, res) => {
  console.log("Hello World!");
  res.json(
    util.success({
      message: "Hello World!",
    }),
  );
});

console.log("API loaded.");

// Create account
api.post("/accounts", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json(
      util.error({ message: "Name, email and password are required" }),
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id",
      [name, email, hashedPassword],
    );

    const userId = result.rows[0].id;
    const token = createToken(userId);
    res.json(
      util.success({ message: "Account created", userId, token, name, email }),
    );
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      res.json(util.error({ message: "Email already exists" }));
    } else {
      res.json(util.error({ message: "Internal server error" }));
    }
  }
});

// Authenticate account
api.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json(
      util.error({
        message: "Email and password are required",
      }),
    );
  }

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.json(
        util.error({
          message: "Invalid email or password",
        }),
      );
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json(
        util.error({
          message: "Invalid email or password",
        }),
      );
    }

    const token = createToken(user.id);
    res.json(
      util.success({
        message: "Authentication successful",
        token,
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(
      util.error({
        message: "Internal server error",
      }),
    );
  }
});

// Check authentication
api.get("/auth-check", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json(
      util.error({
        message: "Authorization token required",
      }),
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] });

    res.json(
      util.success({
        message: "Authentication successful",
        userId: decoded.userId,
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(
      util.error({
        message: "Internal server error",
      }),
    );
  }
});

api.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json(util.error({ message: "Authorization token required" }));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rowCount === 0) {
      return res.json(
        util.error({
          message: "Post not found",
        }),
      );
    }

    res.json(
      util.success({
        message: "Post deleted successfully",
      }),
    );
  } catch (err) {
    console.error("Error deleting post:", err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

api.get("/user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json(util.error({ message: "Authorization token required" }));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const userResult = await pool.query(
      `SELECT id, name, email FROM users WHERE id = $1`,
      [userId],
    );

    if (userResult.rows.length === 0) {
      return res.json(util.error({ message: "User not found" }));
    }

    const user = userResult.rows[0];

    const postsResult = await pool.query(
      `SELECT id, uri, name, breed, weight, age, symptoms FROM posts WHERE user_id = $1`,
      [userId],
    );

    user.posts = postsResult.rows;

    res.json(util.success({ message: "User retrieved successfully", user }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

// Save post
api.post("/save", async (req, res) => {
  const { uri, name, breed, weight, age, symptoms } = req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json(util.error({ message: "Authorization token required" }));
  }

  if (!uri || !name || !breed || !weight || !age || !symptoms) {
    return res.json(
      util.error({
        message: "URI, name, breed, weight, age, and symptoms are required",
      }),
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const existingPost = await pool.query(
      "SELECT id FROM posts WHERE uri = $1 AND user_id = $2",
      [uri, userId],
    );

    if (existingPost.rows.length > 0) {
      return res.json(
        util.error({ message: "Post with this URI already exists" }),
      );
    }

    const result = await pool.query(
      "INSERT INTO posts (uri, name, breed, weight, age, symptoms, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
      [uri, name, breed, weight, age, symptoms, userId],
    );

    const postId = result.rows[0].id;
    const post = { uri, name, breed, weight, age, symptoms, postId };
    res.json(
      util.success({
        message: "Post saved successfully",
        post,
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

module.exports = api;
