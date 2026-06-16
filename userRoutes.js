const express = require("express");

const User = require("../models/User");

const protect =
require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/:id/follow",
  protect,
  async (req, res) => {
    const user =
      await User.findById(req.params.id);

    user.followers.push(req.user.id);

    await user.save();

    res.json({
      message: "User Followed"
    });
  }
);

module.exports = router;