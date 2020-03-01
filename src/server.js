require('dotenv/config');
const express = require('express');

require('./database/postgres/connection');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.API_PORT, () => {
    console.log(`server running on port ${process.env.API_PORT}`)
});