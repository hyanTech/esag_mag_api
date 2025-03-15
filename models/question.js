'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.Poll, { foreignKey: 'pollId' });
    // Une question peut avoir plusieurs options
      Question.hasMany(models.Option, { foreignKey: 'questionId', onDelete: 'CASCADE' });
      Question.hasMany(models.Answer, { foreignKey: 'questionId'});
    }
  }
  Question.init({
    pollId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    text: DataTypes.STRING,
    required: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};