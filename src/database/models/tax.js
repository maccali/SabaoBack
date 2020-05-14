'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    description: DataTypes.STRING,
    taxValue: DataTypes.DOUBLE
  }, {});
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};