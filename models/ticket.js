'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Event, { foreignKey: 'eventId' });
      Ticket.hasOne(models.TicketCode, { foreignKey: 'TicketId' });
    }
  }
  Ticket.init({
    typeTicket: {
      type: DataTypes.STRING,
      allowNull: false
    },
    qte: {   // quantité totale initiale
      type: DataTypes.INTEGER,
      allowNull: false
    },
    available: {  // nombre de tickets encore disponibles
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    saleStartDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    saleEndDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};