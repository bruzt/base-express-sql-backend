'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.addColumn('users', 'reset_password_token', // table users, column reset_password_token
            {
                type: Sequelize.STRING
            }
        );

        return queryInterface.addColumn('users', 'reset_password_expires', // table users, column reset_password_expires
            {
                type: Sequelize.DATE
            }
        );

    },

    down: async (queryInterface, Sequelize) => {

        await queryInterface.removeColumn('users', 'reset_password_token');
        return queryInterface.removeColumn('users', 'reset_password_expires');
    }
};
