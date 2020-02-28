/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('churras', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        descricao: {
          type: Sequelize.STRING, 
          allowNull: false, 
        },
        obs: {
          type: Sequelize.TEXT, 
          allowNull: true, 
        },
        data: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        valor_com_bebida: {
          type: Sequelize.REAL,
          allowNull: false,
        },
        valor_sem_bebida: {
          type: Sequelize.REAL,
          allowNull: false,
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

    return queryInterface.dropTable('churras');

  }
};
