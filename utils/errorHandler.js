const createError = require('http-errors');
const { isCelebrateError } = require('celebrate');

const unknownEndPointHandler = (_req, res) => {
    res.status(404).send({ message: 'Unknown Endpoint' });
};

const errorHandler = (error, _req, res, next) => {
    if (createError.isHttpError(error)) {
        return res.status(error.status).send({ message: error.message });
    }

    if (error.name === 'CastError') {
        return res.status(400).send({ message: 'malformatted id' });
    }

    if (isCelebrateError(error)) {
        console.error(error);
        return res.status(400).json({ message: 'invalid user data' });
    }

    return next(error);
};

module.exports = { unknownEndPointHandler, errorHandler };
