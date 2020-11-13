const express = require('express');
const { celebrate } = require('celebrate');
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getUserOrder,
    getAllOrder,
    updateOrderToDelivered,
} = require('../controllers/orderController');
const { authorize, isAdmin } = require('../utils/authorization');
const { makeOrderValidator, headerValidator } = require('../utils/validator');

const router = express.Router();

router
    .route('/')
    .post(celebrate(makeOrderValidator), authorize, addOrderItems)
    .get(celebrate(headerValidator), authorize, isAdmin, getAllOrder);

router
    .route('/myorders')
    .get(celebrate(headerValidator), authorize, getUserOrder);

router.route('/:id').get(celebrate(headerValidator), authorize, getOrderById);

router
    .route('/:id/pay')
    .put(celebrate(headerValidator), authorize, updateOrderToPaid);

router
    .route('/:id/deliver')
    .put(
        celebrate(headerValidator),
        authorize,
        isAdmin,
        updateOrderToDelivered
    );

module.exports = router;
