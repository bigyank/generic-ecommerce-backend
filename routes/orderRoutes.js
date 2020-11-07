const express = require('express');
const { celebrate } = require('celebrate');
const { addOrderItems } = require('../controllers/orderController');
const authorize = require('../utils/authorization');
const { makeOrderValidator } = require('../utils/validator');

const router = express.Router();

router.route('/').post(celebrate(makeOrderValidator), authorize, addOrderItems);

module.exports = router;
