const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

app.use(express.json());

const aiRouter = require("./routes/Ai");
const authRouter = require("./routes/Auth");

app.use("/api/ai", aiRouter);
app.use("/api/auth", authRouter);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
