const { celebrate } = require('celebrate');
const express = require('express');
const {
    getProducts,
    getProductById,
    deleteProduct,
} = require('../controllers/productControllers');
const { authorize, isAdmin } = require('../utils/authorization');
const { headerValidator } = require('../utils/validator');

const router = express.Router();

router.route('/').get(getProducts);

router
    .route('/:id')
    .get(getProductById)
    .delete(celebrate(headerValidator), authorize, isAdmin, deleteProduct);

module.exports = router;
