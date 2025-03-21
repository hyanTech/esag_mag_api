'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favoris extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favoris.belongsTo(models.Event, { foreignKey: 'eventId' });
      Favoris.belongsTo(models.Actualite, { foreignKey: 'actuId' });
    }
  }
  Favoris.init({
    userId: DataTypes.INTEGER,
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actuId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Favoris',
  });
  return Favoris;
};