'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.addColumn(
        'users_m',
        'age',
        {
          type: Sequelize.INTEGER
        }
      );
    
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('users_m', 'age');
  }
};
