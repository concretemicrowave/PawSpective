const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const { pool } = require("../db");

const JWT_SECRET = process.env.JWT_SECRET;
const router = express.Router();

// DELETE /posts/:id
router.delete("/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));

  try {
    const { id: userId } = jwt.verify(token, JWT_SECRET);
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
      [req.params.id, userId],
    );
    if (!result.rowCount)
      return res.json(util.error({ message: "Post not found" }));
    res.json(util.success({ message: "Post deleted successfully" }));
  } catch (err) {
    console.error("Error deleting post:", err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

module.exports = router;
