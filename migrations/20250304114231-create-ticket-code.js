'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TicketCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ticketName: {
        type: Sequelize.STRING
      },
      ticketCode: {
        type: Sequelize.STRING
      },
      EventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Events", // Assurez-vous que le nom correspond exactement à la table des utilisateurs
          key: "id",
        },
        onDelete: "CASCADE", // Supprime les OTPs si l'utilisateur est supprimé
      },
      TicketId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Tickets", // Assurez-vous que le nom correspond exactement à la table des utilisateurs
          key: "id",
        },
        onDelete: "CASCADE", // Supprime les OTPs si l'utilisateur est supprimé
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
    await queryInterface.dropTable('TicketCodes');
  }
};