const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const conn = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");
const { where } = require("sequelize");

//Database
conn
  .authenticate()
  .then(() => {
    console.log("Conexão Feita com o DB");
  })
  .catch((msgErro) => {
    console.log(msgErro);
  });

//USAR O EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

//CONFIGURANDO PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//ROTAS
app.get("/", (req, res) => {
  Pergunta.findAll({ raw: true, order: [["id", "DESC"]] }).then((perguntas) => {
    res.render("index", { perguntas: perguntas });
  });
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const pergunta = req.body;
  Pergunta.create({
    titulo: pergunta.titulo,
    descricao: pergunta.descricao,
  }).then(() => {
    res.redirect("/");
  });
});

app.get("/pergunta/:id", (req, res) => {
  const id = req.params.id;

  Pergunta.findOne({
    where: { id: id },
  }).then((pergunta) => {
    if (pergunta != undefined) {
      //achou a pergunta

      Resposta.findAll({
        where: { perguntaId: id },
        order: [["id", "DESC"]],
      }).then((respostas) => {
        res.render("pergunta", { pergunta: pergunta, respostas: respostas });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/salvarresposta", (req, res) => {
  const resposta = req.body;
  Resposta.create({
    corpo: resposta.corpo,
    perguntaId: resposta.id,
  }).then(() => {
    res.redirect(`/pergunta/${resposta.id}`);
  });
});

//ABRINDO SERVIDOR
app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
