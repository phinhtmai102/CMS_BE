const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const dataTypes = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.account = require("../models/account.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);
db.department = require("../models/department.model")(sequelize, Sequelize);
db.major = require("../models/majors.model")(sequelize, Sequelize);
db.users = require("../models/users.model")(sequelize, Sequelize);
db.studentInfo = require("../models/studentInfo.model")(sequelize, Sequelize);
db.mentorInfo = require("../models/mentorInfo.model")(sequelize, Sequelize);
db.evaluatorInfo = require("../models/evaluatorInfo.model")(sequelize, Sequelize);
db.refreshToken = require("../models/refreshToken.model.js")(sequelize, Sequelize);
db.group = require("../models/group.model")(sequelize, Sequelize);
db.student_group = require("../models/student_group.model")(sequelize, Sequelize);
db.mentor_group = require("../models/mentor_group.model")(sequelize, Sequelize);
db.file = require("../models/file.model")(sequelize, Sequelize);
db.topic = require("../models/topic.model")(sequelize, Sequelize);
db.defense = require("../models/defense.model")(sequelize, Sequelize);
// one to many 
db.department.hasMany(db.major, {
  foreignKey: "department_id"
});
// db.major.belongsTo(db.department)
// one to many
db.major.hasMany(db.studentInfo, {
  foreignKey: "major_id"
});
// db.studentInfo.belongsTo(db.major)
db.department.hasMany(db.mentorInfo, {
  foreignKey: "department_id"
});
//one to one
db.users.hasOne(db.studentInfo, {
  foreignKey: "user_id"
});

db.users.hasOne(db.mentorInfo, {
  foreignKey: "user_id"
});
// db.studentInfo.belongsTo(db.users);

//one to one
db.account.hasOne(db.users, {
  foreignKey: "account_id"
});
// db.users.belongsTo(db.account);

// db.department.hasMany(db.mentorInfo);
// db.mentorInfo.belongsTo(db.department, {foreignKey:"deparment_id"});

db.department.hasMany(db.evaluatorInfo, {
  foreignKey: "department_id"
});
db.users.hasOne(db.evaluatorInfo, {
  foreignKey: "user_id"
});
// db.evaluatorInfo.belongsTo(db.department);

db.role.belongsToMany(db.account, {
  through: "account_roles",
  foreignKey: "role_id",
});

db.account.belongsToMany(db.role, {
  through: "account_roles",
  foreignKey: "account_id",
});

db.refreshToken.belongsTo(db.account, {
  foreignKey: 'account_id', targetKey: 'account_id'
});
db.account.hasOne(db.refreshToken, {
  foreignKey: 'account_id', targetKey: 'account_id'
});


//group
db.group.hasMany(db.student_group,{
  // through: "student_groups",
  foreignKey:"group_id", targetKey: "group_id"
});
db.student_group.belongsTo(db.group);

db.studentInfo.hasMany(db.student_group,{
  // through: "student_groups",
  // foreignKey:"group_id",
});
db.student_group.belongsTo(db.studentInfo);

//mentor - group
db.mentor_group.hasMany(db.group)
db.mentorInfo.hasMany(db.mentor_group,{
  // foreignKey: "group_id",
});
db.mentor_group.hasMany(db.mentorInfo)

db.group.hasMany(db.file,{
  foreignKey: "group_id",
});
db.group.hasOne(db.topic,{
  foreignKey: "topic_id", targetKey: "topic_id"
});
db.topic.belongsTo(db.group, {});
db.group.hasOne(db.defense,{
  foreignKey:"defense_id",
});

db.ROLES = ["student", "admin", "moderator", "dean", "evaluator", "mentor","group"];
sequelize.sync({ alter: true });
module.exports = db;