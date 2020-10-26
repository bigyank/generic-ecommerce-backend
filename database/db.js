import mongoose from 'mongoose';

const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((conn) => {
      console.log(`connected to ${conn.connection.host}`.cyan.underline);
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`.red.underline);
      process.exit(1);
    });
};

export default connectToDB;
