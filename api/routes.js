const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Express server up and running!');
});

module.exports = { app };