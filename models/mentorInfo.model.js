const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize)=>{
    const mentorInfo = sequelize.define("mentorInfo", {
        degree: {type: DataTypes.STRING(100)}
    });
    // mentorInfo.create({
    //     degree:"Thac sy",
    //     department_id:"CNTT",
    // })
    return mentorInfo;
}