// Full Express middleware to auto-handle Grey-Oak Assistant intents
const express = require('express');
const bodyParser = require('body-parser');
const detectIntent = require('./intent-mapper').detectIntent;

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

// Simulate action dispatching
app.post('/gpt-message', (req, res) => {
  const { message } = req.body;
  const detected = detectIntent(message);

  if (!detected) {
    return res.json({ route: null, message: 'No action triggered', passthrough: true });
  }

  // Simulated routing
  res.json({
    intent: detected.intent,
    actionRoute: detected.action,
    match: detected.match.slice(1),
    status: 'ready-to-dispatch'
  });
});

app.listen(PORT, () => console.log(`🧠 Intent middleware router on http://localhost:${PORT}`));
