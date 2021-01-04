// File for database connection
const dbConfig = require("../config/dbConfig");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorAliases: false,
  ssl: true,

  logging: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.groups = require("./createGroupModel")(sequelize, Sequelize);
db.users = require("./userModel")(sequelize, Sequelize);
db.userGroups = require("./userGroupModel")(sequelize, Sequelize);
db.expenses = require("./expenseModel")(sequelize, Sequelize);

// db.users.belongsToMany(db.groups, {
//   through: db.userGroups,
//   foreignKey: "userId"
// });
// db.users.belongsToMany(db.groups, {
//   through: db.expenses,
//   foreignKey: "userId"
// });

// db.groups.belongsToMany(db.users, {
//   through: db.userGroups,
//   foreignKey: "groupId"
// });
// db.groups.belongsToMany(db.users, {
//   through: db.expenses,
//   foreignKey: "groupId"
// });

db.userGroups.belongsTo(db.groups, { foreignKey: "groupId" });
db.userGroups.belongsTo(db.users, { foreignKey: "userId" });

db.expenses.belongsTo(db.groups, { foreignKey: "groupId" });
db.expenses.belongsTo(db.users, { foreignKey: "userId" });

module.exports = db;
