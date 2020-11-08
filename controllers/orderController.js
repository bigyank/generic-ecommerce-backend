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

/**
 *
 * @desc Get order by ID
 * @route POST /api/orders/:id
 * @access private
 */
const getOrderById = async (req, res) => {
    const { id } = req;
    const order = await Order.findById(id).populate('user', 'name', 'email');

    if (!order) throw createError(404, 'Order not found');

    res.status(200).send(order);
};

module.exports = { addOrderItems, getOrderById };
