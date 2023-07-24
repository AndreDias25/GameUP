// server/index.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server/index.js
app.get('/api/key', (req, res) => {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
      res.json({ apiKey });
    } else {
      res.status(500).json({ message: 'API key not found.' });
    }
  });