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
    if (userResult.rows.length === 0)
      return res.json(util.error({ message: "User not found" }));

    const postsResult = await pool.query(
      "SELECT id, name, breed, history FROM posts WHERE user_id = $1",
      [userId],
    );
    const posts = {};
    postsResult.rows.forEach((row) => {
      posts[row.id] = {
        name: row.name,
        breed: row.breed,
        history: row.history,
      };
    });
    res.json(
      util.success({
        message: "User retrieved successfully",
        user: { ...userResult.rows[0], posts },
      }),
    );
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
  }
});

// Save post
api.post("/save", async (req, res) => {
  const { uri, name, breed, weight, age, symptoms, time, postId } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.json(util.error({ message: "Authorization token required" }));
  if (!uri || !name || !breed || !weight || !age) {
    return res.json(
      util.error({ message: "URI, name, breed, weight, and age are required" }),
    );
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const openaiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a veterinary assistant AI that classifies a pet’s health score from 0 to 10.

          Focus on the following:
          1. Breed-specific average weight is **critical**. A deviation of more than 20% under or over average is unhealthy.
          2. Young pets (under 1 year) or elderly pets (over breed's average lifespan) may have different thresholds.
          3. Symptoms such as vomiting, fatigue, loss of appetite, or difficulty breathing significantly lower the score.
          4. Assign a score:
             - 10: Perfect health, optimal weight, no symptoms
             - 7–9: Slight weight variation, mild or no symptoms
             - 4–6: Noticeable weight issues OR moderate symptoms
             - 1–3: Severe under/overweight OR critical symptoms
             - 0: Life-threatening condition or extremely abnormal stats

          Respond with only a **single number between 0 and 10**.`,
        },
        {
          role: "user",
          content: `A pet has the following characteristics:
          - Weight: ${weight} kg
          - Age: ${age} years
          - Symptoms: ${symptoms}
          - Breed: ${breed}

          Classify the pet's health status strictly as a health score between 0 and 10, where 10 is very healthy, 5 is on the way to being unhealthy and 1 is extreme and needs to seek medical attention immediately.`,
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
              score: {
                type: "number",
                description:
                  "The health score between 0 and 10, where 10 is very healthy, 5 is on the way to being unhealthy and 1 is extreme and needs to seek medical attention immediately. Example: 7.",
              },
            },
            required: ["score"],
            additionalProperties: false,
          },
        },
      },
      temperature: 0.3,
    });

    const parsed = JSON.parse(openaiResponse.choices[0].message.content.trim());
    const score = parsed.score;

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
      "SELECT * FROM posts WHERE id = $1 AND user_id = $2",
      [postId, userId],
    );

    if (existing.rows.length > 0) {
      await pool.query(
        `
        UPDATE posts
        SET name = $1,
            breed = $2,
            history =
              CASE
                WHEN jsonb_typeof(history) = 'array' THEN
                  jsonb_build_array($3::jsonb) || history
                ELSE
                  jsonb_build_array($3::jsonb)
              END
        WHERE id = $4 AND user_id = $5
        `,
        [name, breed, JSON.stringify(entry), postId, userId],
      );

      return res.json(
        util.success({
          message: "Post updated successfully",
          post: { postId, name, breed },
        }),
      );
    } else {
      await pool.query(
        `
        INSERT INTO posts (id, name, breed, history, user_id)
        VALUES ($1, $2, $3, jsonb_build_array($4::jsonb), $5)
        `,
        [postId, name, breed, JSON.stringify(entry), userId],
      );

      return res.json(
        util.success({
          message: "Post saved successfully",
          post: { postId, name, breed },
        }),
      );
    }
  } catch (err) {
    console.error(err);
    res.json(util.error({ message: "Internal server error" }));
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
