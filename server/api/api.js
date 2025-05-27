const express = require("express");
const util = require("../util/util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const { pool } = require("../db");
const { OpenAI } = require("openai");
const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");
const fileType = require("file-type");

const upload = multer({ dest: "uploads/" });

const createToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

let api = express.Router();

console.log("Loading API...");

api.get("/", (req, res) => {
  console.log("Hello World!");
  res.json(util.success({ message: "Hello World!" }));
});

console.log("API loaded.");

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

api.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json(util.error({ message: "Email and password are required" }));
  }

  try {
    const result = await pool.query(
      "SELECT id, password FROM users WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.json(util.error({ message: "Invalid email or password" }));
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json(util.error({ message: "Invalid email or password" }));
    }

    const token = createToken(user.id);
    res.json(util.success({ message: "Authentication successful", token }));
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

api.get("/auth-check", async (req, res) => {
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

api.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;
    const result = await pool.query(
      "DELETE FROM posts WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId],
    );

    if (result.rowCount === 0)
      return res.json(util.error({ message: "Post not found" }));
    res.json(util.success({ message: "Post deleted successfully" }));
  } catch (err) {
    console.error("Error deleting post:", err);
    res.json(util.error({ message: "Internal server error" }));
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
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const userResult = await pool.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [userId],
    );
    if (!userResult.rows.length)
      return res.json(util.error({ message: "User not found" }));

    const postsResult = await pool.query(
      `
      SELECT
        id,
        name,
        breed,
        weightgoal    AS "weightGoal",
        history
      FROM posts
      WHERE user_id = $1
      `,
      [userId],
    );

    const posts = {};
    for (const row of postsResult.rows) {
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
        user: {
          ...userResult.rows[0],
          posts,
        },
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

// Save post
api.post("/save", async (req, res) => {
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
          content: `You are a veterinary assistant AI... respond with a single number.`,
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
      `
      SELECT
        weightgoal AS "weightGoal"
      FROM posts
      WHERE id = $1
        AND user_id = $2
      `,
      [postId, userId],
    );

    if (existing.rows.length) {
      const newGoal =
        weightGoal != null ? weightGoal : existing.rows[0].weightgoal;
      await pool.query(
        `
        UPDATE posts
        SET
          name       = $1,
          breed      = $2,
          weightgoal = $3,
          history    = jsonb_build_array($4::jsonb) || history
        WHERE id = $5
          AND user_id = $6
        `,
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
        `
        INSERT INTO posts
          (id, name, breed, weightgoal, history, user_id)
        VALUES
          ($1, $2, $3, $4, jsonb_build_array($5::jsonb), $6)
        `,
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

// Predict Breed, Age, Weight, Symptoms
api.post("/predict-breed", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = req.file.path;
    const fileBuffer = fs.readFileSync(filePath);
    const type = await fileType.fromBuffer(fileBuffer);

    if (!type || !["image/jpeg"].includes(type.mime)) {
      return res.json(util.error({ message: "File is not a JPG or JPEG" }));
    }

    const resizedBuffer = await sharp(fileBuffer)
      .resize({ width: 800 })
      .toBuffer();

    const base64Image = resizedBuffer.toString("base64");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: [
            {
              type: "text",
              text: "You are a veterinary expert trained to identify pet(mainly dogs and cats) breeds, weight, age(in years), and symptoms based on an image. You are given an image of a pet. Please provide a strict description of the pet's breed, weight, age, and symptoms.",
            },
          ],
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "pet-description",
          schema: {
            strict: true,
            type: "object",
            properties: {
              breed: {
                type: "string",
                description:
                  "The breed of the pet. Example: Golden Retriever. If the pet is not in the photo, enter null.",
              },
              weight: {
                type: "number",
                description:
                  "The whole number weight of the pet in kilograms. Do not add the unit at the end. Example: 10.",
              },
              age: {
                type: "number",
                description:
                  "The whole number age of the pet in years. Example: 6.",
              },
              symptoms: {
                type: "string",
                description:
                  "The symptoms of the pet. Example: Ear Infection, Diarrhea. If no symptoms, enter None.",
              },
            },
            required: ["breed", "weight", "age", "symptoms"],
            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(response.choices[0].message.content);
    const breed = result.breed;

    const enhancedResult = {
      ...result,
    };

    res.json(enhancedResult);

    fs.unlinkSync(req.file.path);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "Failed to process the image" });
  }
});

module.exports = api;
