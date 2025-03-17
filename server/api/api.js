const express = require("express");
const util = require("../util/util");

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
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json(
      util.error({
        message: "Username and password are required",
      }),
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, hashedPassword],
    );

    res.json(
      util.success({
        message: "Account created",
        userId: result.rows[0].id,
      }),
    );
  } catch (err) {
    console.error(err);
    if (err.code === "23505") {
      // Unique constraint violation
      res.json(
        util.error({
          message: "Username already exists",
        }),
      );
    } else {
      res.json(
        util.error({
          message: "Internal server error",
        }),
      );
    }
  }
});

// Authenticate account
api.post("/api/authenticate", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json(
      util.error({
        message: "Username and password are required",
      }),
    );
  }

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE username = $1",
      [username],
    );

    if (result.rows.length === 0) {
      return res.json(
        util.error({
          message: "Invalid username or password",
        }),
      );
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json(
        util.error({
          message: "Invalid username or password",
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
