'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Event.hasOne(models.Ticket, { foreignKey: 'eventId' });
      Event.hasOne(models.TicketCode, { foreignKey: 'EventId' });
    }
  }
  Event.init({
    titre: DataTypes.STRING,
    sous_titre:DataTypes.STRING,
    details:DataTypes.TEXT,
    lieu:DataTypes.STRING,
    date:DataTypes.DATE,
    imageCover: DataTypes.STRING,
    saleStartDate:{
      type: DataTypes.DATE,
      allowNull:true
    },
    saleEndDate:{
      type: DataTypes.DATE,
      allowNull:true
    },
    isPaid:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    enabled:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};