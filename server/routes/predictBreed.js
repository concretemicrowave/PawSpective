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
    if (!req.file)
      return res.status(400).json(util.error({ message: "No file uploaded" }));
    const buf = fs.readFileSync(req.file.path);
    const type = await fileType.fromBuffer(buf);
    if (!type || type.mime !== "image/jpeg")
      return res.json(util.error({ message: "File is not a JPG or JPEG" }));

    const resized = await sharp(buf).resize({ width: 800 }).toBuffer();
    const b64 = resized.toString("base64");

    const ai = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a veterinary expert …" },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${b64}` },
            },
          ],
        },
      ],
      response_format: { type: "json_schema" /* …schema…*/ },
    });

    const result = JSON.parse(ai.choices[0].message.content);
    res.json(result);
    fs.unlinkSync(req.file.path);
  } catch (err) {
    console.error("Error processing image:", err);
    res.status(500).json({ error: "Failed to process the image" });
  }
});

module.exports = router;
