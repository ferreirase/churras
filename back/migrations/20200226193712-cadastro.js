/* eslint-disable no-undef */
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('cadastro', {
        id: {
          type: Sequelize.INTEGER, 
          allowNull: false, 
          autoIncrement: true, 
          primaryKey: true
        },
        churras_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'churras', key: 'id'},
          onDelete: 'CASCADE',
          allowNull: false, 
        },
        participante_id: {
          type: Sequelize.INTEGER, 
          references: {model: 'participantes', key: 'id'},
          onDelete: 'CASCADE',
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

    return queryInterface.dropTable('cadastro');

  }
};
