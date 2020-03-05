const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserModel extends Model {

    static init(connection) {

        super.init({

            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.INTEGER,
            password_hash: DataTypes.STRING,
            password: DataTypes.VIRTUAL

        }, {
            tableName: 'users',
            sequelize: connection,
            hooks: {
                beforeSave: async (user) => {

                    if (user.password) {

                        user.password_hash = await bcrypt.hash(user.password, 8);
                    }
                }
            }
        });
    }

    static associate(models) {

        this.hasMany(models.AddressModel, {
            foreignKey: 'user_id',
            as: 'addresses'
        });

        this.belongsToMany(models.TechModel, {
            foreignKey: 'user_id',
            through: 'users_techs',
            as: 'techs'
        });
    }

    checkPassword(password) {

        return bcrypt.compare(password, this.password_hash);
    }

    generateToken() {

        return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    }
}

module.exports = UserModel;