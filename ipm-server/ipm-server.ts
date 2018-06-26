import express = require('express');
import bodyParser = require("body-parser");

import { Aluno } from '../ipm-gui/src/app/aluno/aluno';
import { Aula } from '../ipm-gui/src/app/aula/aula';

import { CadastroAlunos } from './cadastrodealunos';
import { CadastroAulas} from './cadastrodeaulas';

var app = express();

var cadastroAlunos : CadastroAlunos = new CadastroAlunos();
var cadastroAulas : CadastroAulas = new CadastroAulas();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/alunos', function (req, res) {
  res.send(JSON.stringify(cadastroAlunos.getAlunos()));
})

app.get('/aulas', function (req, res) {
  res.send(JSON.stringify(cadastroAulas.getAulas()));
})

app.post('/alunos', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastroAlunos.criar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser cadastrado"});
  }
})

app.post('/aulas', function (req: express.Request, res: express.Response) {
  var aula: Aula = <Aula> req.body;
  aula = cadastroAulas.criar(aula);
  if (aula) {
    res.send({"success": "O cliente foi cadastrado com sucesso"});
  } else {
    res.send({"failure": "O cliente não pode ser cadastrado"});
  }
})

app.put('/alunos', function (req: express.Request, res: express.Response) {
  var aluno: Aluno = <Aluno> req.body;
  aluno = cadastroAlunos.atualizar(aluno);
  if (aluno) {
    res.send({"success": "O aluno foi atualizado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser atualizado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }
