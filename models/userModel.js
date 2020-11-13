/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

userSchema.methods.verifyPassword = async function verifyPassword(
    enteredPassword
) {
    return bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function encryptPassword(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

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
            delete returnedObject.password;
            if (!returnedObject.isAdmin) delete returnedObject.isAdmin;
        },
    });
};

cleanDatabaseFields(userSchema);

const User = mongoose.model('User', userSchema);

module.exports = User;
