const express = require('express')
const app = express()



// Running The Server
const PORT = process.env.PORT || 8000
const start = async () => {
    app.listen(PORT, () => console.log(`Listening on port 3000`))
};

start();