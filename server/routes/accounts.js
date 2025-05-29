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

module.exports = router;
