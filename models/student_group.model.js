const { DataTypes } = require('sequelize');
const { sequelize, Sequelize } = require('.');
module.exports = (sequelize, Sequelize) => {
    const student_group = sequelize.define("student_group", {
        student_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        group_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        final_grade: {
            type: DataTypes.STRING(10)
        }
    });
    
    // student_group.create({
    //     groupGroupId: "CS1.24",
    //     studentInfoId: "321",
    // });
    return student_group;
}