const express = require("express");
const { readDb, writeDb } = require("../utils/dbjson");
const router = express.Router();
const RESOURCE = "comments";

router.get("/", async (req, res) => {
  const comments = await readDb(RESOURCE);
  res.json({
    status: "success",
    data: comments,
  });
});

router.get("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((p) => p.id === +req.params.id);
  if (!comment) {
    res.status(401).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  res.json({
    status: "success",
    data: comment,
  });
});

router.post("/", async (req, res) => {
  const comments = await readDb(RESOURCE);
  const comment = { ...req.body, id: (comments.at(-1)?.id ?? 0) + 1 };
  await writeDb(RESOURCE, [...comment, comment]);
  res.status(201).json({
    status: "success",
    data: comment,
  });
});

router.put("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((p) => p.id === +req.params.id);
  if (!comment) {
    res.status(401).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  Object.assign(comment, req.body);
  res.json({
    status: "success",
    data: comment,
  });
});

router.delete("/:id", async (req, res) => {
  const comments = await readDb(RESOURCE);
  const comment = comments.find((p) => p.id === +req.params.id);
  if (!comment) {
    res.status(401).json({
      status: "error",
      message: "resource not found",
    });
    return;
  }
  await writeDb(RESOURCE, comments.splice(comment.id));
  res.status(204).json({
    status: "success",
  });
});

module.exports = router;
