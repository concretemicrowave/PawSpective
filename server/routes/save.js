const express = require("express");
const jwt = require("jsonwebtoken");
const util = require("../util/util");
const { pool } = require("../db");
const { OpenAI } = require("openai");

const JWT_SECRET = process.env.JWT_SECRET;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const router = express.Router();

router.post("/save", (req, res, next) => next());
router.post("/", async (req, res) => {
  const { uri, name, breed, weight, age, symptoms, time, postId, weightGoal } =
    req.body;
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json(util.error({ message: "Authorization required" }));
  }

  if (!uri || !name || !breed || weight == null || age == null) {
    return res.status(400).json(
      util.error({
        message: "uri, name, breed, weight, and age are required",
      }),
    );
  }

  try {
    const { id: userId } = jwt.verify(token, JWT_SECRET);
    await pool.query("BEGIN");

    const openaiResp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a veterinary assistant AI... respond with a single number.",
        },
        {
          role: "user",
          content: `Weight: ${weight} kg
Age: ${age} years
Symptoms: ${symptoms}
Breed: ${breed}
Return a score 0–10.`,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "pet-description",
          schema: {
            strict: true,
            type: "object",
            properties: { score: { type: "number" } },
            required: ["score"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
    });

    const { score } = JSON.parse(openaiResp.choices[0].message.content);
    const entry = {
      timestamp: time,
      uri,
      name,
      breed,
      weight,
      age,
      symptoms,
      score,
    };

    const existing = await pool.query(
      `SELECT weightgoal AS "weightGoal" FROM posts WHERE id = $1 AND user_id = $2`,
      [postId, userId],
    );

    if (existing.rows.length) {
      const newGoal =
        weightGoal != null ? weightGoal : existing.rows[0].weightGoal;
      await pool.query(
        `UPDATE posts
         SET name = $1,
             breed = $2,
             weightgoal = $3,
             history = jsonb_build_array($4::jsonb) || history
         WHERE id = $5 AND user_id = $6`,
        [name, breed, newGoal, JSON.stringify(entry), postId, userId],
      );

      await pool.query("COMMIT");
      return res.status(200).json(
        util.success({
          message: "Post updated",
          post: { postId, name, breed },
        }),
      );
    } else {
      const initGoal = weightGoal != null ? weightGoal : score;
      await pool.query(
        `INSERT INTO posts (id, name, breed, weightgoal, history, user_id)
         VALUES ($1, $2, $3, $4, jsonb_build_array($5::jsonb), $6)`,
        [postId, name, breed, initGoal, JSON.stringify(entry), userId],
      );

      await pool.query("COMMIT");
      return res.status(201).json(
        util.success({
          message: "Post created",
          post: { postId, name, breed },
        }),
      );
    }
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error(err);
    return res
      .status(500)
      .json(util.error({ message: "Internal server error" }));
  }
});

module.exports = router;
