'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Response extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Response.belongsTo(models.Poll, { foreignKey: 'pollId' });
    // Une réponse contient plusieurs réponses aux questions
    Response.hasMany(models.Answer, { foreignKey: 'responseId', onDelete: 'CASCADE' });
    }
  }
  Response.init({
    pollId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Response',
  });
  return Response;
};