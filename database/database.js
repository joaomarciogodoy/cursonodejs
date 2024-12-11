const Sequelize = require("sequelize");

const conn = new Sequelize("guiaperguntas", "root", "!#*Aa40028922", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = conn;
