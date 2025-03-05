'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TicketCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TicketCode.belongsTo(models.Event, { foreignKey: 'EventId' });
      TicketCode.belongsTo(models.Ticket, { foreignKey: 'TicketId' });
    }
  }
  TicketCode.init({
    ticketName: DataTypes.STRING,
    ticketCode: DataTypes.STRING,
    EventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events", // Assurez-vous que le nom correspond exactement à la table des utilisateurs
        key: "id",
      },
      onDelete: "CASCADE", // Supprime les OTPs si l'utilisateur est supprimé
    },
    TicketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Tickets", // Assurez-vous que le nom correspond exactement à la table des utilisateurs
        key: "id",
      },
      onDelete: "CASCADE", // Supprime les OTPs si l'utilisateur est supprimé
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'TicketCode',
  });
  return TicketCode;
};