'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    numero: DataTypes.STRING,
    appartenance: DataTypes.STRING,
    profile: DataTypes.STRING,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};