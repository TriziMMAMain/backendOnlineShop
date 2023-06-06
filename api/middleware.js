const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const middleware = express();

middleware.use(cors());
middleware.use(bodyParser.json());

module.exports = middleware;