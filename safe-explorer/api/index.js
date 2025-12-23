const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.post('/api/start-session', (req, res) => {
  const { level } = req.body;
  res.json({ sessionId: Date.now().toString(), timeLeft: 30 * 60 * 1000 });
});

module.exports = app;
