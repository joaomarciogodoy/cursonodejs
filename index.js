const express = require("express");
const app = express();
const bodyParser = require("body-parser");

//USAR O EJS
app.set("view engine", "ejs");
app.use(express.static("public"));

//CONFIGURANDO PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

//ROTAS
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/perguntar", (req, res) => {
  res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
  const pergunta = req.body;

  res.send(`Título: ${pergunta.titulo} e descrição: ${pergunta.descricao}`);
});

//ABRINDO SERVIDOR
app.listen(3000, () => {
  console.log("Server rodando na porta 3000");
});
