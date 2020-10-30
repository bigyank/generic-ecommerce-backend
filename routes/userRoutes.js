const express = require('express');
const {
    loginUser,
    signupUser,
    getProfile,
} = require('../controllers/userControllers');
const authorize = require('../utils/authorization');

const router = express.Router();

router.route('/login').post(loginUser);

router.route('/signup').post(signupUser);

router.route('/profile').get(authorize, getProfile);

module.exports = router;
