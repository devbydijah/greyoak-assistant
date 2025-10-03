// Render entry point — runs only the intent router (port 5000)
const express = require("express");
const bodyParser = require("body-parser");
const detectIntent = require("./intent-mapper").detectIntent;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/gpt-message", (req, res) => {
  const { message } = req.body;
  const detected = detectIntent(message);

  if (!detected) {
    return res.json({
      echo: req.body,
      note: "Stubbed mock response",
      timestampWAT:
        new Date().toISOString().replace("T", " ").slice(0, 16) + " WAT",
    });
  }

  res.json({
    intent: detected.intent,
    actionRoute: detected.action,
    match: detected.match.slice(1),
    status: "ready-to-dispatch",
  });
});

app.listen(PORT, () =>
  console.log(`🚀 Intent router live on http://localhost:${PORT}`)
);
