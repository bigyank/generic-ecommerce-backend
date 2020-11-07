const createError = require('http-errors');
const Order = require('../models/orderModel');

/**
 *
 * @desc Create new order
 * @route POST /api/orders
 * @access private
 */

const addOrderItems = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        itemsPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        throw createError(400, 'No order item');
    }

    const order = new Order({
        user: req.user.id,
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        shippingPrice,
        itemsPrice,
        totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

module.exports = { addOrderItems };
