const express = require('express');
const { addOrderItems } = require('../controllers/orderController');
const authorize = require('../utils/authorization');

const router = express.Router();

router.route('/').post(authorize, addOrderItems);

module.exports = router;
