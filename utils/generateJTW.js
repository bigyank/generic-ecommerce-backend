const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const generateJWT = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '4h' });
};

module.exports = generateJWT;
