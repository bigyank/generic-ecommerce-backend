const express = require('express');
const products = require('./products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.get('/api/products', (_req, res) => {
  res.status(200).json(products);
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;

  const product = products.find((product) => product._id === id);

  if (!product) return res.status(404).json({ error: 'item not found' });

  res.status(200).json(product);
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
