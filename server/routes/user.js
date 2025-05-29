const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const { pool } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));

  try {
    const { id: userId } = jwt.verify(token, JWT_SECRET);
    const u = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId],
    );
    if (!u.rows.length)
      return res.json(util.error({ message: "User not found" }));

    const postsQ = await pool.query(
      `SELECT id,name,breed,weightgoal AS "weightGoal",history
       FROM posts WHERE user_id = $1`,
      [userId],
    );

    const posts = {};
    for (const row of postsQ.rows) {
      posts[row.id] = {
        name: row.name,
        breed: row.breed,
        weightGoal: row.weightGoal,
        history: row.history,
      };
    }

    res.json(
      util.success({
        message: "User retrieved successfully",
        user: { ...u.rows[0], posts },
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

module.exports = router;
