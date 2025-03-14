'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Poll.hasMany(models.Question, { foreignKey: 'pollId', onDelete: 'CASCADE' });
      Poll.hasMany(models.Response, { foreignKey: 'pollId', onDelete: 'CASCADE' });
    }
  }
  Poll.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration: {
      type: DataTypes.ENUM('1j', '2j', '1 semaine'),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Poll',
  });
  return Poll;
};