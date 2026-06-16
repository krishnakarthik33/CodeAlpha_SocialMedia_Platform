require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB =
require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/posts",
  require("./routes/postRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.get("/", (req, res) => {
  res.send("Social Media API Running");
});

app.listen(
  process.env.PORT,
  () => {
    console.log(
      `Server running on port ${process.env.PORT}`
    );
  }
);