'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    //verification du mot de passe
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }

  }
  Admin.init({
    Name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
      unique:{
        name: 'unique_email_constraint',
        msg: 'L\'adresse e-mail est déjà utilisée.'
      },
    },
    password:DataTypes.STRING,
    profil:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    enabled:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'Admin',
    hooks:{
      beforeCreate: async (admin) => {
        if (admin.password) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
      beforeUpdate: async (admin) => {
        if (admin.password && admin.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          admin.password = await bcrypt.hash(admin.password, salt);
        }
      },
    }
  });
  return Admin;
};