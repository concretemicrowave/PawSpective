const express = require("express");
const util = require("../util/util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

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
api.post("/api/accounts", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json(util.error({ message: "Email and password are required" }));
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [email, hashedPassword],
    );

    const userId = result.rows[0].id;
    const token = createToken(userId);

    res.json(util.success({ message: "Account created", userId, token }));
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
api.post("/api/authenticate", async (req, res) => {
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
api.get("/api/auth-check", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json(
      util.error({
        message: "Authorization token required",
      }),
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
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

module.exports = api;
