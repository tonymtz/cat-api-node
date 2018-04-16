const express = require('express');

const app = express();

const api = app.use('/api', (req, res, next) => {
    req.apiVersionCode = 1;
    next();
});

api.use('/api/images', require('./images'));

module.exports = app;
