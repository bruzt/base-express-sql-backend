const { Model, DataTypes } = require('sequelize');

class TechModel extends Model {

    static init(connection){

        super.init({

            name: DataTypes.STRING,

        }, {
            tableName: 'techs',
            sequelize: connection
        });
    }

    static associate(models){

        this.belongsToMany(models.UserModel, {
            foreignKey: 'tech_id',
            through: 'users_techs',
            as: 'users'
        });
    }
}

module.exports = TechModel;