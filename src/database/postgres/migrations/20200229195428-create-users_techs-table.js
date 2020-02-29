'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        
        return queryInterface.createTable('users_techs', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            tech_id: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false
            }
        });
    },

    down: (queryInterface, Sequelize) => {
        
        return queryInterface.dropTable('users_techs');
    }
};
