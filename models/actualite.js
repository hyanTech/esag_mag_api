'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Actualite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Actualite.hasMany(models.Favoris, { foreignKey: 'actuId' });
    }
  }
  Actualite.init({
    titre: DataTypes.STRING,
    sous_titre: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description_mobile:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageCover:DataTypes.STRING,
    enabled: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Actualite',
  });
  return Actualite;
};