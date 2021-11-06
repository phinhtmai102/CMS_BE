const DataTypes = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING
      }
    });
    return Role;
  };

 