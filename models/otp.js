'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Otp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Otp.belongsTo(models.User, { foreignKey: 'UserId', as: 'user' });
    }
  }
  Otp.init({
    code: DataTypes.INTEGER,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // Assurez-vous que le nom correspond exactement à la table des utilisateurs
        key: "id",
      },
      onDelete: "CASCADE", // Supprime les OTPs si l'utilisateur est supprimé
    }
  }, {
    sequelize,
    modelName: 'Otp',
  });
  return Otp;
};