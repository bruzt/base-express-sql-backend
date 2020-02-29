const Sequelize = require('sequelize');

const config = require('./config');

const Users_m = require('../../models/Users_m');
const Addresses_m = require('../../models/Addresses_m');

const connection = new Sequelize(config);

Users_m.init(connection);
Addresses_m.init(connection);

Users_m.associate(connection.models);
Addresses_m.associate(connection.models);

module.exports = connection;