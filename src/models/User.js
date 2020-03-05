const { Model, DataTypes } = require('sequelize');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends Model {

    static init(connection){

        super.init({

            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.INTEGER,
            password_hash: DataTypes.STRING,
            password: DataTypes.VIRTUAL

        }, {
            sequelize: connection
        });
    }

    static associate(models){

        this.hasMany(models.Address, {
            foreignKey: 'user_id',
            as: 'addresses'
        });

        this.belongsToMany(models.Tech, {
            foreignKey: 'user_id',
            through: 'users_techs',
            as: 'techs'
        });
    }

    async beforeSave(user){

        if(user.password){

            user.password_hash = await bcrypt.hash(user.password, 8);
        }
    }

    checkPassword(password) {
        
        return bcrypt.compare(password, this.password_hash);
    }

    generateToken() {

        return jwt.sign({ id: this.id }, process.env.APP_SECRET);
    }
}

module.exports = User;