/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        rating: {
            type: Number,
            required: true,
            max: 5,
            min: 1,
        },
        comment: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        price: {
            type: Number,
            required: true,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
            default: 0,
        },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);

const cleanDatabaseFields = (schemaName) => {
    /*
     * replaces _id with id
     * deletes __v before sending
     */
    schemaName.set('toJSON', {
        virtuals: true,
        transform: (_document, returnedObject) => {
            delete returnedObject._id;
            delete returnedObject.__v;
        },
    });
};

cleanDatabaseFields(productSchema);
cleanDatabaseFields(reviewSchema);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
