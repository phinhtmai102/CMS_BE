const { DataTypes } = require("sequelize");
const { group } = require(".");
module.exports = (sequelize, Sequelize) => {
    const mentor_group = sequelize.define("mentor_group", {
        mentor_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        group_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        evaluator_id: {
            type: DataTypes.STRING
        },

    });
    return mentor_group;
}