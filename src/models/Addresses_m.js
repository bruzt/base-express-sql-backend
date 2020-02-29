const { Model, DataTypes } = require('sequelize');

class Addresses_m extends Model {

    static init(connection){

        super.init({

            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,

        }, {
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsTo(models.Users_m, {
            foreignKey: 'user_id',
            as: 'user'
        });
    }
}

module.exports = Addresses_m;