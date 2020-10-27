const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
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

// parse upcomming requests body
app.use(express.json());

// logger
app.use(morgan('tiny'));

// use secure headers
app.use(helmet());

//  apply to all requests
app.use(limiter);

app.use('/api/products', productRoute);

app.use(unknownEndPointHandler);
app.use(errorHandler);

module.exports = app;
