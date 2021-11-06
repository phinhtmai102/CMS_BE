const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) =>{
    const Users = sequelize.define("users", {
        user_id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4},
        first_name:{type: DataTypes.STRING},
        last_name:{type: DataTypes.STRING},
        date_of_birth:{type: DataTypes.DATE, allowNull: false},
        phone_number:{type: DataTypes.STRING(11), allowNull: false},
        fullName: {
            type: DataTypes.VIRTUAL,
            get() {
              return `${this.first_name} ${this.last_name}`;
            },
            set(value) {
              throw new Error('Do not try to set the `fullName` value!');
            }
        }
    });
    return Users;
}