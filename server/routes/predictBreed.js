const express = require("express");
const multer = require("multer");
const fs = require("fs");
const sharp = require("sharp");
const fileType = require("file-type");
const { OpenAI } = require("openai");
const util = require("../util/util");

const upload = multer({ dest: "uploads/" });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json(util.error({ message: "No file uploaded" }));
    }

    const buf = fs.readFileSync(req.file.path);
    const type = await fileType.fromBuffer(buf);
    if (!type || type.mime !== "image/jpeg") {
      fs.unlinkSync(req.file.path);
      return res
        .status(400)
        .json(util.error({ message: "File is not a JPEG" }));
    }

    const resized = await sharp(buf).resize({ width: 800 }).toBuffer();
    const base64Image = resized.toString("base64");

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a veterinary expert trained to identify pet (mainly dogs and cats) breeds, weight, age (in years), and symptoms based on an image. Respond only in strict JSON format. If you cannot determine the breed, use null explicitly instead of guessing. However, if you know the breed, you must give the weight and age. The symptoms can be null if there is none. Your response must match the schema exactly.",
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
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
              breed: { type: ["string"] },
              weight: { type: ["number"] },
              age: { type: ["number"] },
              symptoms: { type: ["string"] },
            },
            required: ["breed", "weight", "age", "symptoms"],
            additionalProperties: false,
          },
        },
      },
    });

    const result = JSON.parse(aiResponse.choices[0].message.content);

    res.json(util.success({ pet: result }));
  } catch (err) {
    console.error("Error processing image:", err);
    res
      .status(500)
      .json(util.error({ message: "Failed to process the image" }));
  } finally {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
  }
});

module.exports = router;
