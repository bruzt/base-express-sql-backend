const express = require('express');

require('./database/postgres/connection');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log(`server running on port ${process.env.SERVER_PORT}`)
});