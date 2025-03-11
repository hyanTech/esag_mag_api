'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    static associate(models) {
      // Définir les associations ici si nécessaire
    }
  }

  Suggestion.init(
    {
      nom: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: ''
      },
      
      object: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categorie: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM('anonyme', 'public'),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Suggestion',
    }
  );

  return Suggestion;
};
