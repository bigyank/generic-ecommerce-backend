const express = require('express');
const { celebrate } = require('celebrate');
const {
    loginUser,
    signupUser,
    getProfile,
    updateProfile,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
} = require('../controllers/userControllers');
const { authorize, isAdmin } = require('../utils/authorization');
const {
    loginValidator,
    signupValidator,
    headerValidator,
    updateProfileValidator,
    userUpdateAdmin,
} = require('../utils/validator');

const router = express.Router();

router.route('/login').post(celebrate(loginValidator), loginUser);

router.route('/signup').post(celebrate(signupValidator), signupUser);

router
    .route('/profile')
    .get(celebrate(headerValidator), authorize, getProfile)
    .put(celebrate(updateProfileValidator), authorize, updateProfile);

// admin route
router.route('/all').get(authorize, isAdmin, getUsers);

router
    .route('/:id')
    .delete(celebrate(headerValidator), authorize, isAdmin, deleteUser)
    .get(celebrate(headerValidator), authorize, isAdmin, getUserById)
    .put(celebrate(userUpdateAdmin), authorize, isAdmin, updateUser);

module.exports = router;
