const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const connectToDatabase = require("./config/Db");

// Connect to MongoDB
connectToDatabase(); 

app.use(cors());
app.use(express.json());

const authMiddleware = require("./middleware/middleware");

const authRouter = require("./routes/Auth");
const aiRouter = require("./routes/Ai");
const user = require("./routes/User");

app.use("/auth-middleware", authMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/ai", authMiddleware, aiRouter);
app.use("/data/user", authMiddleware, user);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
