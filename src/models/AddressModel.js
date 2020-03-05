const { Model, DataTypes } = require('sequelize');

class AddressModel extends Model {

    static init(connection){

        super.init({

            zipcode: DataTypes.STRING,
            street: DataTypes.STRING,
            number: DataTypes.INTEGER,

        }, {
            tableName: 'addresses',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsTo(models.UserModel, {
            foreignKey: 'user_id',
            as: 'user'
        });
    }
}

module.exports = AddressModel;