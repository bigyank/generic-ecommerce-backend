const { celebrate } = require('celebrate');
const express = require('express');
const {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createReview,
    getTopProducts,
} = require('../controllers/productControllers');
const { authorize, isAdmin } = require('../utils/authorization');
const {
    headerValidator,
    updateProductAdmin,
    createReviewValidator,
} = require('../utils/validator');

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(celebrate(headerValidator), authorize, isAdmin, createProduct);

router.route('/top').get(getTopProducts);

router
    .route('/:id/reviews')
    .post(celebrate(createReviewValidator), authorize, createReview);

router
    .route('/:id')
    .get(getProductById)
    .delete(celebrate(headerValidator), authorize, isAdmin, deleteProduct)
    .put(celebrate(updateProductAdmin), authorize, isAdmin, updateProduct);

module.exports = router;
