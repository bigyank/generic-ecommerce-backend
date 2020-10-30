const http = require('http');
const app = require('./app'); // the actual Express application
const connectToDB = require('./database/db');
const { PORT } = require('./utils/config');

// connect to the database
connectToDB();
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.blue);
});
