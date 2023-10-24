const express = require('express');
const moment = require('moment-timezone');
const app = express();
const port = 4000; // Choose a different port from your web clock server (e.g., 4000)

app.use(express.json());

// Sample time zones data
const timeZones = [
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Asia/Tokyo',
  'Asia/Sydney',
];

// Route to fetch time zone options
app.get('/timezones', (req, res) => {
  res.json(timeZones);
});

// Route to get the current time in a specific time zone
app.get('/current-time', (req, res) => {
  const { timeZone } = req.query;
  if (timeZones.includes(timeZone)) {
    const currentTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    res.json({ time: currentTime });
  } else {
    res.status(400).json({ error: 'Invalid time zone' });
  }
});

app.listen(port, () => {
  console.log(`API server is running on http://localhost:${port}`);
});
