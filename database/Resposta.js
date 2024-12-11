const Sequelize = require("sequelize");
const conn = require("./database");

const Resposta = conn.define("respostas", {
  corpo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  perguntaId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Resposta.sync({ force: false }).then(() => {
  console.log("Tabela Respostas criada");
});

module.exports = Resposta;
