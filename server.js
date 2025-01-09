const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const { OpenAI } = require('openai');

const app = express();
app.use(bodyParser.json());

// Initialiser OpenAI avec la clé API
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // La clé API d'OpenAI dans .env
});

// Vérifier que l'API key correspond
const API_KEY = process.env.API_KEY;

app.post('/api', async (req, res) => {
    const { prompt, key } = req.body;

    // Vérifier la clé API
    if (key !== API_KEY) {
        return res.status(403).json({ error: 'Invalid API key' });
    }

    // Vérifier qu'un prompt est fourni
    if (!prompt) {
        return res.status(400).json({ error: 'No prompt provided' });
    }

    try {
        // Utilisation de l'API OpenAI pour générer la réponse
        const completion = await openai.chat.completions.create({
            model: 'gpt-4', // Ou un autre modèle comme 'gpt-3.5-turbo'
            messages: [{ role: 'user', content: prompt }],
        });

        // Renvoyer la réponse générée
        const response = completion.choices[0].message.content;
        res.json({ response });
    } catch (error) {
        console.error('Erreur avec OpenAI:', error.message);
        res.status(500).json({ error: 'Erreur lors de la communication avec OpenAI.' });
    }
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
});
