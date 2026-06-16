const express = require("express");

const Post = require("../models/Post");
const Comment = require("../models/Comment");

const protect =
require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const post = await Post.create({
    userId: req.user.id,
    content: req.body.content
  });

  res.json(post);
});

router.get("/", async (req, res) => {
  const posts = await Post.find();

  res.json(posts);
});

router.post("/:id/like", protect, async (req, res) => {
  const post = await Post.findById(
    req.params.id
  );

  post.likes.push(req.user.id);

  await post.save();

  res.json(post);
});

router.post(
  "/:id/comment",
  protect,
  async (req, res) => {
    const comment =
      await Comment.create({
        postId: req.params.id,
        userId: req.user.id,
        comment: req.body.comment
      });

    res.json(comment);
  }
);

module.exports = router;