const { Model, DataTypes } = require('sequelize');

class Users_m extends Model {

    static init(connection){

        super.init({

            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.INTEGER

        }, {
            sequelize: connection
        });
    }
}

module.exports = Users_m;