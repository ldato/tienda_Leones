require('dotenv').config();
const express = require('express');
const router = require('./router');

const app = express();
const port = 3000;

router(app);


app.listen(port, () => {
    console.log("Server running in port " + port);
});

