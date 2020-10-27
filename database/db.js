const mongoose = require('mongoose');

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log(
            `connected to database sucessfully: ${conn.connection.host}`.cyan
                .underline
        );
    } catch (error) {
        console.error(`Error connecting to database: ${error}`.red.bold);
        process.exit(1);
    }
};

module.exports = connectToDB;
