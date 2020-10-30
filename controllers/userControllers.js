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

module.exports = { loginUser };
