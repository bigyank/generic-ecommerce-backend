import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectToDB from './database/db.js';
import products from './products.js';

dotenv.config();

// Connect to the database
connectToDB();
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

app.listen(PORT, console.log(`server is running on port ${PORT}`.green.bold));
