require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
require('./database/connection');

class App {

    constructor(){

        this.express = express();

        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.express.use(cors({ origin: '*' }));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(express.static(path.resolve(__dirname, 'views')));
    }

    routes(){

        this.express.use(routes);
    }
}

module.exports = new App().express;