const express = require('express');
const createError = require('http-errors');
const Product = require('../models/productModel');

const router = express.Router();

router.get('/', async (_req, res) => {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) throw createError(404, 'Product Not Found');

    res.status(200).json(product);
});

module.exports = router;
