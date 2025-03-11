'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Agent.belongsTo(models.Event, { foreignKey: 'eventId' });
    }
  }
  Agent.init({
    name: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    codeAgent: {
      type: DataTypes.STRING,
      defaultValue: true
    },
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Agent',
  });
  return Agent;
};