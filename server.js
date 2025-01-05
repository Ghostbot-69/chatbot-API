const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const API_KEY = process.env.API_KEY;

app.post('/api', (req, res) => {
    const { prompt, key } = req.body;

    if (key !== API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    const response = `You asked: ${prompt}. This is your generated response.`;
    res.json({ response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
