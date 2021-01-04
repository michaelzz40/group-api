// const Sequelize = require('sequelize');
const User = require("./userModel");
const Group = require("./createGroupModel");
const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const UserGroup = sequelize.define(
    "userGroups",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  return UserGroup;
};
