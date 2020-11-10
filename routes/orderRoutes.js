const express = require('express');
const { celebrate } = require('celebrate');
const {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
} = require('../controllers/orderController');
const authorize = require('../utils/authorization');
const { makeOrderValidator } = require('../utils/validator');

const router = express.Router();

router.route('/').post(celebrate(makeOrderValidator), authorize, addOrderItems);

router.route('/:id').get(authorize, getOrderById);

router.route('/:id/pay').put(authorize, updateOrderToPaid);

module.exports = router;
