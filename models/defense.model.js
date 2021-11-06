const{DataTypes} = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, Sequelize) =>{
    const defense = sequelize.define("defense", {
        defense_id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        defense_name:{
            type: DataTypes.STRING(30),
            allowNull: true
        },
        defense_date:{
            type: DataTypes.DATE
        }
    });
    return defense;
}