const express = require('express');
require('dotenv').config();
const colors = require('colors');
require('express-async-errors');
const connectToDB = require('./database/db');
const productRoute = require('./routes/productRoutes');
const {
  unknownEndPointHandler,
  errorHandler,
} = require('./utils/errorHandler.js');

// Connect to the database
connectToDB();

const app = express();
const PORT = process.env.PORT;

app.use('/api/products', productRoute);

app.use(unknownEndPointHandler);
app.use(errorHandler);
app.listen(PORT, console.log(`server is running on port ${PORT}`.green.bold));
