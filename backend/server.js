const express = require("express");
require("dotenv").config();

const app = express();

const port = 3000;

const aiRouter = require("./routes/Ai");

app.use("/api/ai", aiRouter);

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
