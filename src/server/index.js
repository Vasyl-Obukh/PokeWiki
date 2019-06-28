const express = require('express');
const path = require('path');

const router = express.Router();

const app = express();
const port = 8000;

app.get('/api/pokemons', (req, res) => {
  res.json({ 'a': 'hello' });
});

app.get('*', (req, res) => {
  res.end();
});

app.listen(port, () => console.log(`Server started on port ${port}`));
