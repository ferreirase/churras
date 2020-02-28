/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('usuarios', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        nome: {
          type: Sequelize.STRING, 
          allowNull: false, 
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        hash_senha: {
          type: Sequelize.STRING, 
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });
    
  },
  down: (queryInterface) => {

    return queryInterface.dropTable('usuarios');

  }
};
