const Sequelize = require('sequelize');

const autoRequireAll = require('../../util/autoRequireAll');
const config = require('./config');

const models = autoRequireAll(__dirname, '../../models');

const connection = new Sequelize(config);

for(const model in models){
    models[model].init(connection);
}

for(const model in models){
    models[model].associate(connection.models);
}

module.exports = connection;