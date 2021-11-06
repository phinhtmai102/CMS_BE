const {DataTypes} = require('sequelize');
const { sequelize, Sequelize } = require('.');

module.exports = (sequelize, Sequelize) => {
    const topic = sequelize.define("topic",{
        topic_id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        topic_name:{
            type: DataTypes.STRING(50),
            allowNull: true
        },
        descrition: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    // topic.create({
    //     topic_id:"1e114bfc-67b6-49dd-861d-e3230080266f",
    //     topic_name:"Hostpital",
    //     descrition:"abc"
    // })
    return topic;
}