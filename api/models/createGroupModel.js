const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
        groupId: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        companyName: {
            type: Sequelize.STRING
        },
        totalExpense: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });
    return Group;
}