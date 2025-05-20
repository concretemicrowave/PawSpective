const sharp = require("sharp");
const path = require("path");

const inputPath = path.join(__dirname, "favicon.svg");
const outputPath = path.join(__dirname, "favicon.png");

sharp(inputPath)
  .png({ quality: 90 })
  .toFile(outputPath)
  .then(() => console.log("✅", outputPath, "created"))
  .catch((err) => console.error(err));
