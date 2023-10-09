const express = require('express')
const app = express()
const connectDB = require('./db/connect')
require('dotenv').config();
const { errorHandler } = require('./middleware/error');
const { notFound } = require('./middleware/not-found');


// Not Found
app.use(notFound)
// Error Handler Middleware
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 8000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_CLOUD_URI);
        app.listen(PORT, () =>
            console.log(`Server is listening on port ${PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
