'use strict'
module.exports = (sequelize, DataTypes) => {
  const RecordPurchase = sequelize.define(
    'RecordPurchase',
    {
      record_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      releaseDate: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      distributingTax: DataTypes.STRING,
      description: DataTypes.STRING,
      amount: DataTypes.DOUBLE,
      grossAmount: DataTypes.DOUBLE,
      taxRate: DataTypes.DOUBLE,
      distributingTax: DataTypes.DOUBLE,
      taxRatePay: DataTypes.BOOLEAN,
      distributingTaxPay: DataTypes.BOOLEAN,
    },
    {}
  )
  RecordPurchase.associate = function (models) {
    // associations can be defined here
    RecordPurchase.belongsTo(models.User)
  }
  return RecordPurchase
}
