const createError = require('http-errors');
const User = require('../models/userModel');
const generateJWT = require('../utils/generateJTW');

/**
 *
 * @desc Login user
 * @route GET /api/user/login
 * @access public
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.verifyPassword(password))) {
        const JWT = generateJWT(user.id);
        const userToSend = { ...user.toJSON(), token: JWT };
        return res.status(200).send(userToSend);
    }

    throw createError(401, 'email or password mismatch');
};

/**
 *
 * @desc Signup user
 * @route GET /api/user/signup
 * @access public
 */
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
        throw createError(400, 'User Already Exists');
    }

    try {
        const user = await User.create({ name, email, password });
        const JWT = generateJWT(user.id);
        const userToSend = { ...user.toJSON(), token: JWT };
        res.status(201).send(userToSend);
    } catch (error) {
        throw createError(400, 'Invalid User Data');
    }
};

/**
 *
 * @desc get user profile
 * @route GET /api/user/profile
 * @access private
 */
const getProfile = (req, res) => {
    res.status(200).send(req.user);
};

module.exports = { loginUser, getProfile, signupUser };
