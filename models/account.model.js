const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("accounts", {
      account_id:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4},
      user_name:{type: DataTypes.STRING(100)},
      email: {type: DataTypes.STRING(50)},
      password:{type: DataTypes.STRING}
    });
    return Account;
  };