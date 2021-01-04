// const Sequelize = require('sequelize');
const User = require("./userModel");
const Group = require("./createGroupModel");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const expenses = sequelize.define(
    "expenses",
    {
      transactionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false
    }
  );

  return expenses;
};
