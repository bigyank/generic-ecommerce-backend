const express = require('express');
const { celebrate } = require('celebrate');
const {
    loginUser,
    signupUser,
    getProfile,
    updateProfile,
} = require('../controllers/userControllers');
const authorize = require('../utils/authorization');
const {
    loginValidator,
    signupValidator,
    getProfileValidator,
    updateProfileValidator,
} = require('../utils/validator');

const router = express.Router();

router.route('/login').post(celebrate(loginValidator), loginUser);

router.route('/signup').post(celebrate(signupValidator), signupUser);

router
    .route('/profile')
    .get(celebrate(getProfileValidator), authorize, getProfile)
    .put(celebrate(updateProfileValidator), authorize, updateProfile);

module.exports = router;
