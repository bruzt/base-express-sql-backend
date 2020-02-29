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

    static associate(models){

        this.hasMany(models.Addresses_m, {
            foreignKey: 'user_id',
            as: 'addresses'
        });
    }
}

module.exports = Users_m;