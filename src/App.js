require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const path = require('path');

const routes = require('./routes');
require('./database/connection');

const app = express();
 
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'views')));
    
app.use(routes);

app.use(errors());
    
module.exports = app;