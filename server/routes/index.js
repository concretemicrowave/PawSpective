const express = require("express");
const accounts = require("./accounts");
const auth = require("./auth");
const posts = require("./posts");
const user = require("./user");
const save = require("./save");
const predict = require("./predictBreed");

const router = express.Router();

console.log("Loading API...");
router.get("/", (req, res) => {
  console.log("Hello World!");
  res.json(require("../util/util").success({ message: "Hello World!" }));
});
console.log("API loaded.");

router.use("/accounts", accounts);
router.use("/authenticate", auth);
router.use("/auth-check", auth); // you could merge check into same auth module
router.use("/posts", posts);
router.use("/user", user);
router.use("/save", save);
router.use("/predict-breed", predict);

module.exports = router;
