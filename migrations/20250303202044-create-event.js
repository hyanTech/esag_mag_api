'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titre: {
        type: Sequelize.STRING
      },
      sous_titre:{
        type: Sequelize.STRING
      },
      details:{
        type:Sequelize.TEXT
      },
      lieu:{
        type:Sequelize.STRING
      },
      date:{
        type:Sequelize.DATE
      },
      imageCover: {
        type: Sequelize.STRING
      },
      isPaid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Events');
  }
};