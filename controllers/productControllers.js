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

/**
 *
 * @desc Delete a product
 * @route DELETE /api/products/:id
 * @access private
 */
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.sendStatus(204);
};

/**
 *
 * @desc Create a product
 * @route POST /api/products
 * @access private
 */
const createProduct = async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user.id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    });

    const createdProduct = await product.save();
    res.status(201).send(createdProduct);
};

/**
 *
 * @desc Update a product
 * @route PUT/api/products/:id
 * @access private
 */
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body;

    const product = await Product.findById(id);

    if (!product) throw createError(404, 'Product not found!');

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).send(updatedProduct);
};

module.exports = {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
};
