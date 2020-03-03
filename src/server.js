require('dotenv/config');
const express = require('express');
const cors = require('cors');
const path = require('path');

require('./database/postgres/connection');
const routes = require('./routes');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'views')));

app.use(routes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`server running on port ${process.env.PORT}`)
});

module.exports = app;