const { DataTypes, STRING, UUIDV4 } = require('sequelize');
// const { group, group } = require('.');
module.exports = (sequelize, Sequelize) => {
    const group = sequelize.define("group", {
        group_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: true
        },
        topic_id: {
            type: DataTypes.UUID,
            allowNull: true,
            defaultValua: UUIDV4
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
        defense_id: {
            type: DataTypes.STRING
        }
    });
    // group.create({ 
    //     group_id: "CS1.24",
    //     });
    return group;
}
