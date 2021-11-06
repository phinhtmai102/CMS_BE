const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize)=>{
    const studentInfo = sequelize.define("studentInfo", {
        code: {
            type: DataTypes.STRING(21)
        },
        typeofcapstones: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        average_grade: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return studentInfo;
}