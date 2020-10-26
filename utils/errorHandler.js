const createError = require('http-errors');

const unknownEndPointHandler = (_req, res) => {
  res.status(404).send({ message: 'Unknown Endpoint' });
};

const errorHandler = (error, _request, response, next) => {
  if (createError.isHttpError(error)) {
    return response.status(error.status).send({ message: error.message });
  }

  if (error.name === 'CastError') {
    return response.status(400).send({ message: 'malformatted id' });
  }

  next(error);
};

module.exports = { unknownEndPointHandler, errorHandler };
