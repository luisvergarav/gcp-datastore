
const router = require('./routes.js');
const express = require('express');
const app = express();
app.use('/datastore',router);
app.listen(3001);
