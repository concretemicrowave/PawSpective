const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const { pool } = require("../db");

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json(
      util.error({ message: "Name, email and password are required" }),
    );

  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING id",
      [name, email, hashed],
    );
    const userId = result.rows[0].id;
    res.json(
      util.success({
        message: "Account created",
        userId,
        token: createToken(userId),
        name,
        email,
      }),
    );
  } catch (err) {
    console.error(err);
    if (err.code === "23505")
      return res.json(util.error({ message: "Email already exists" }));
    res.json(util.error({ message: "Internal server error" }));
  }
});

router.delete("/", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.json(util.error({ message: "No token provided" }));

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);

    res.json(util.success({ message: "Account deleted" }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Invalid token or internal error" }));
  }
});

router.post("/verify-email", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.json(util.error({ message: "No token provided" }));

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const result = await pool.query("SELECT email FROM users WHERE id = $1", [
      userId,
    ]);
    const email = result.rows[0]?.email;

    if (!email) return res.json(util.error({ message: "Email not found" }));

    // TODO: send email using a mail service
    console.log(`Simulate sending verification to ${email}`);

    res.json(util.success({ message: "Verification email sent" }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Invalid token or internal error" }));
  }
});

router.patch("/change-name", async (req, res) => {
  const authHeader = req.headers.authorization;
  const { name } = req.body;

  if (!authHeader || !name)
    return res.json(util.error({ message: "Authorization and name required" }));

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    await pool.query("UPDATE users SET name = $1 WHERE id = $2", [
      name,
      userId,
    ]);

    res.json(util.success({ message: "Name updated" }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Failed to update name" }));
  }
});

router.patch("/change-password", async (req, res) => {
  const authHeader = req.headers.authorization;
  const { currentPassword, newPassword } = req.body;

  if (!authHeader || !currentPassword || !newPassword)
    return res.json(util.error({ message: "All fields required" }));

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const result = await pool.query(
      "SELECT password FROM users WHERE id = $1",
      [userId],
    );
    const hashed = result.rows[0]?.password;

    const match = await bcrypt.compare(currentPassword, hashed);
    if (!match)
      return res.json(util.error({ message: "Current password incorrect" }));

    const newHashed = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
      newHashed,
      userId,
    ]);

    res.json(util.success({ message: "Password updated" }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Failed to update password" }));
  }
});

module.exports = router;
