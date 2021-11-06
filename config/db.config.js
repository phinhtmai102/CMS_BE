module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "BBqqphiazd102@",
    DB: "database",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {freezeTableName: true}
  };