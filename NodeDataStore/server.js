
const router = require('./routes.js');
const express = require('express');
const app = express();

// Set Content-Type for all responses for these routes
app.use(express.json())
app.use('/datastore',router);
app.listen(3001);
