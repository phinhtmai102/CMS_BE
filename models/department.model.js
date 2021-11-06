const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
    const Department = sequelize.define("departments", {
        department_id:{ 
            type: DataTypes.STRING,
            primaryKey: true},
        department_name:{type: DataTypes.STRING}
    });
    return Department;
}