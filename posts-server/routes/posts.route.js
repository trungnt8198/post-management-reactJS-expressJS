const express = require("express");
const { readDb, writeDb } = require("../utils/dbjson");
const router = express.Router();
const RESOURCE = "posts";

router.get("/", async (req, res) => {
  const posts = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: posts,
  });
});

router.get("/:id", async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((p) => p.id === +req.params.id);
  if (!post) {
    res.status(404).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  res.json({
    status: "success",
    data: post,
  });
});

router.post("/", async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = { ...req.body, id: (posts.at(-1)?.id ?? 0) + 1 };
  await writeDb(RESOURCE, [...posts, post]);
  res.status(201).json({
    status: "success",
    data: post,
  });
});

router.put("/:id", async (req, res) => {
  const posts = await readDb(RESOURCE);
  const post = posts.find((p) => p.id === +req.params.id);
  if (!post) {
    res.status(404).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  Object.assign(post, req.body);
  await writeDb(RESOURCE, posts);
  res.json({
    status: "success",
    data: post,
  });
});

router.delete("/:id", async (req, res) => {
  const posts = await readDb(RESOURCE);
  const index = posts.findIndex((p) => p.id === +req.params.id);

  if (index === -1) {
    res.status(404).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  posts.splice(index, 1);
  await writeDb(RESOURCE, posts);
  res.status(204).end();
});

module.exports = router;
