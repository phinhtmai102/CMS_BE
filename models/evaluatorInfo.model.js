const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize)=>{
    const EvaluatorInfo = sequelize.define("evaluatorInfo", {
        degree: {type: DataTypes.STRING(100)}
    });
    return EvaluatorInfo;
}