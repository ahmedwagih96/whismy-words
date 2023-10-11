require('dotenv').config();
const connectDB = require('./db/connect.js')
const { errorHandler } = require('./middleware/error.js');
const { notFound } = require('./middleware/not-found.js');
const express = require('express')
const app = express()
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/users', require('./routes/user.route.js'));
app.use('/api/posts', require('./routes/post.route.js'));
app.use('/api/comments', require('./routes/comment.route.js'));

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
