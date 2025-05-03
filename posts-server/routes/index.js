const express = require("express");
const commentsRoute = require("./comments.route");
const postRoute = require("./posts.route");

const router = express.Router();
router.use("/comments", commentsRoute);
router.use("/posts", postRoute);

module.exports = router;
