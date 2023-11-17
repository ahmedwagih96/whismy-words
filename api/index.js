require('dotenv').config();
const xss = require('xss-clean')
const hpp = require('hpp');
const cors = require("cors");
const connectDB = require('./db/connect.js')
const { errorHandler } = require('./middleware/error.js');
const path = require('path')
const express = require('express')
const app = express()
app.use(express.json());
app.use(cors());
// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());
// Protect Http Param Pollution
app.use(hpp());

// Routes
app.use('/api/auth', require('./routes/auth.route.js'));
app.use('/api/users', require('./routes/user.route.js'));
app.use('/api/posts', require('./routes/post.route.js'));
app.use('/api/comments', require('./routes/comment.route.js'));
app.use('/api/category', require('./routes/category.route.js'));
app.use('/api/password', require('./routes/password.route.js'))


const staticPath = path.join(__dirname, '../.next');
app.use(express.static(staticPath));

// Error Handler Middleware
app.use(errorHandler);

app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'server/app/index.html'));
})

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
