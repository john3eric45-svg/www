const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

const SESSION_TIMEOUT = 30 * 60 * 1000;
const activeSessions = new Map();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/start-session', (req, res) => {
  const { level } = req.body;
  const sessionId = Date.now().toString();
  setTimeout(() => activeSessions.delete(sessionId), SESSION_TIMEOUT);
  activeSessions.set(sessionId, { level });
  res.json({ sessionId, timeLeft: SESSION_TIMEOUT });
});

module.exports = app;
