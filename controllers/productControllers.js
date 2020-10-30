const createError = require('http-errors');
const Product = require('../models/productModel');

/**
 *
 * @desc Fetch all Products
 * @route GET /api/products
 * @access public
 */
const getProducts = async (req, res) => {
    const allProducts = await Product.find();
    res.status(200).json(allProducts);
};

/**
 *
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access public
 */
const getProductById = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) throw createError(404, 'Product Not Found');

    res.status(200).json(product);
};

module.exports = { getProducts, getProductById };
