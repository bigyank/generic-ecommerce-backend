const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModel');
const { JWT_SECRET } = require('./config');

const authorize = async (req, _res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET);

            const user = await User.findById(decoded.id);

            if (!user) throw createError(401, 'Not Authorized');

            req.user = user;
            return next();
        } catch (error) {
            if (error.name === 'TokenExpiredError')
                throw createError(401, 'token expired');
            throw createError(401, 'Not Authorized');
        }
    }

    throw createError(401, 'Not Authorized');
};

const isAdmin = (req, _res, next) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }

    throw createError(401, 'Not Authorized');
};

module.exports = { authorize, isAdmin };
