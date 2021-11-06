const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) =>{
    const Majors = sequelize.define("majors", {
        major_id:{type: DataTypes.STRING, primaryKey: true},
        major_name:{type: DataTypes.STRING}
    });
    return Majors;
}