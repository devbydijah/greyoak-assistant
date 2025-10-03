// server.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

const intentMapper = require("./intent-mapper");

app.post("/gpt-message", (req, res) => {
  const { message } = req.body;
  const result = intentMapper(message);
  res.json({
    ...result,
    timestampWAT: new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
    }),
  });
});

app.get("/", (req, res) => {
  res.send("✅ Grey-Oak Assistant is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Intent router live on http://localhost:${PORT}`);
});
