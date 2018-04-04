const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
// const router = express.Router();
const db = require('./mongo');

app.use('/api', require('./routes'));

db.connect('mongodb://localhost:27017/opendata', (err) => {
    if (err) {
        console.log('Unable to connect to MongoDB');
        process.exit(1);
    } else {
        console.log('connected to db');
    }
})

// app.use('/api', router);

app.listen(port, () => {
    console.log('listening at http://localhost:3000');
});