// HANDLE TIME ZONE CHANGES

const express = require('express');
const moment = require('moment-timezone'); // Require the moment-timezone library
const app = express();
const port = 3000; // Port number

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON requests
app.use(express.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
// Define a route to change the time zone
app.post('/change-timezone', (req, res) => {
  const { timeZone } = req.body; // Expecting the timeZone as a JSON parameter
  
  
  if (!timeZone) {
    res.status(400).json({ error: 'Time zone is required.' });
  } else {
    try {
      // Convert the current time to the specified time zone
      const currentTime = moment().tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
      res.json({ message: `Time zone changed to ${timeZone}`, currentTime });
    } catch (error) {
      res.status(400).json({ error: 'Invalid time zone.' });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
