'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },

    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      protected: true,
      validate: {
        notEmpty: true,
        min: 5
      }
    },

    senhaResetarToken: {
      type: DataTypes.STRING,
    },

    senhaResetarExpira: {
      type: DataTypes.DATE
    }

  }, {
    instanceMethods: {
      toJSON: function () {
        var ret = Instance.prototype.toJSON.call(this);

        delete ret.senha;
        return ret;
      }
    }
  });
  User.associate = function (models) {
    User.hasMany(models.RecordPurchase, {as: 'recordpurchase'})
  };
  return User;
};