const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const db = require('./mongo');

app.use('/open-api', require('./routes'));

app.listen(port, () => {
    console.log('listening at http://localhost:3000');
});