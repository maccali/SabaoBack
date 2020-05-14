'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('RecordPurchases', {
      record_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      releaseDate: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      grossAmount: {
        type: Sequelize.DOUBLE
      },
      taxRate: {
        type: Sequelize.DOUBLE
      },
      taxRatePay: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      distributingTax: {
        type: Sequelize.DOUBLE
      },
      distributingTaxPay: {
        default: false,
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('RecordPurchases');
  }
};