const { DataTypes } = require('sequelize');
const { sequelize, Sequelize, group } = require('.');

module.exports = (sequelize, Sequelize) => {
    const file = sequelize.define("file", {
        file_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        file_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        file_type: {
            type: DataTypes.STRING(10)
        },
        storage: {
            type: DataTypes.STRING
        },
        group_id: {
            type: DataTypes.STRING
        },
        size: {
            type: DataTypes.STRING
        }
    });
    return file;
}