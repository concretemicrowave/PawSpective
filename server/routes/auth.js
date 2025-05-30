const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const { pool } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json(util.error({ message: "Email and password are required" }));

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email],
    );
    if (!result.rows.length)
      return res.json(util.error({ message: "Invalid email or password" }));

    const user = result.rows[0];
    if (!(await bcrypt.compare(password, user.password)))
      return res.json(util.error({ message: "Invalid email or password" }));

    res.json(
      util.success({
        message: "Authentication successful",
        token: createToken(user.id),
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

router.get("/auth-check", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json(
      util.success({
        message: "Authentication successful",
        userId: decoded.id,
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

module.exports = router;
