/* eslint-disable no-undef */
'use strict';

//essa migration adiciona uma nova coluna à tabela users
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'participantes', //tabela do banco a qual quero adicionar uma coluna
      'pago', //nome da coluna no banco 
      {
        type: Sequelize.BOOLEAN, 
        allowNull: false, 
        defaultValue: false
      }
    )
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('participantes', 'pago');
  }
};
