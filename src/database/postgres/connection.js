const Sequelize = require('sequelize');

const autoRequire = require('../../util/autoRequire');
const config = require('./config');

const models = autoRequire(__dirname, '../../models');

const connection = new Sequelize(config);

for(const model in models){
    models[model].init(connection);
}

for(const model in models){
    models[model].associate(connection.models);
}

module.exports = connection;