const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');

const connectToDB = require('./database/db');
const users = require('./data/users');
const products = require('./data/products');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

connectToDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0].id;
        console.log(adminUser);
        // make admin as user of all products

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);

        console.log(`data imported`.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

const deleteData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('Data deleted'.yellow.inverse);
        process.exit();
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}
