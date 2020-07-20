const express = require('express');
const errHandler = require('./middlewares/errorHandler');
const router = require('./routes');
const PORT = process.env.PORT || 3000;
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);
app.use(errHandler);

// app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

module.exports = app;