const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();
// eslint-disable-next-line no-unused-vars
const colors = require('colors');
require('express-async-errors');
const morgan = require('morgan');

const connectToDB = require('./database/db');
const productRoute = require('./routes/productRoutes');
const {
    unknownEndPointHandler,
    errorHandler,
} = require('./utils/errorHandler.js');
const limiter = require('./utils/rateLimiter');

// Connect to the database
connectToDB();

const app = express();

// parse application/json
// limit req size to 5kb
app.use(express.json({ limit: '5kb' }));

// logger
app.use(morgan('tiny'));

// use secure headers
app.use(helmet());

//  apply to all requests
app.use(limiter);

// compress all responses
app.use(compression());

app.use('/api/products', productRoute);

app.use(unknownEndPointHandler);
app.use(errorHandler);

module.exports = app;
