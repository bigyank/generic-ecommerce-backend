const createError = require('http-errors');

const unknownEndPointHandler = (_req, res) => {
  res.status(404).send({ message: 'Unknown Endpoint' });
};

const errorHandler = (error, _req, res, next) => {
  console.log('Error =>', error);

  if (createError.isHttpError(error)) {
    return res.status(error.status).send({ message: error.message });
  }

  if (error.name === 'CastError') {
    return res.status(400).send({ message: 'malformatted id' });
  }

  next(error);
};

module.exports = { unknownEndPointHandler, errorHandler };
