const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });

  if (existing) {
    return res.json({
      message: "User already exists"
    });
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (
    user &&
    (await bcrypt.compare(
      password,
      user.password
    ))
  ) {
    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET
    );

    return res.json({
      token
    });
  }

  res.status(400).json({
    message: "Invalid Credentials"
  });
});

module.exports = router;