const Sequelize = require('sequelize');

const config = require('./config');

const Users_m = require('../../models/User_m');

const connection = new Sequelize(config);

Users_m.init(connection);

module.exports = connection;