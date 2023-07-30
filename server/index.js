const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Permitir todas as origens (não recomendado em produção)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Sua rota para buscar a chave de API
app.get('/api', (req, res) => {
    const apiKey = process.env.API_KEY;
    console.log("API Key:", apiKey);
    if (apiKey) {
        res.json({ apiKey });
    } else {
        res.status(500).json({ message: 'API key not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
