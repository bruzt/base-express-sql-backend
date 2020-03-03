
const sequelize = require('../../src/database/connection');

module.exports = () => {

    return Promise.all(Object.keys(sequelize.models).map(async key => {
        
        await sequelize.query(`DELETE FROM sqlite_sequence WHERE name = '${sequelize.models[key].tableName}'`);
        
        return sequelize.models[key].destroy({ truncate: true, force: true });
    }));
}