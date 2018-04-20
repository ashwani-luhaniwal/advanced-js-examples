const express = require('express');
const app = express();
const flatpickr = require('flatpickr');

app.use(express.static(__dirname + 'index.html'));

app.listen(3000, () => {
  console.log("App is listening on http://localhost:3000/");
})