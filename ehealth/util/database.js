const Sequelize = require("sequelize");

const sequelize = new Sequelize("ehealth", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
