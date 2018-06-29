import express = require('express');
import bodyParser = require("body-parser");

import { RelatorioTurma } from '../ipm-gui/src/app/relatorio/TurmaRelatorio';
import {CadastroDeRelatorios} from './cadastroderelatorios';
import {AlocacaoDeMonitores} from './alocacaodemonitores';

var app = express();

var cadastroRelatorio: CadastroDeRelatorios = new CadastroDeRelatorios();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(bodyParser.json());

app.get('/relatorio', function (req, res) {
  res.send(JSON.stringify(cadastroRelatorio.getRelatoriosTurmas()));
})

app.post('/relatorio', function (req: express.Request, res: express.Response) {
  var relatorioTurma: RelatorioTurma = <RelatorioTurma> req.body; 
  relatorioTurma = cadastroRelatorio.fecharTurmaAtual(relatorioTurma);
  if (relatorioTurma) {
    res.send({"success": "O relatorio foi registrado com sucesso"});
  } else {
    res.send({"failure": "O relatorio não pode ser registrado"});
  }
})

app.get('/alocaçao', function (req, res) {
  res.send(JSON.stringify(AlocacaoDeMonitores.getMonitorAluno()));
})

app.post('/alocaçao', function (req: express.Request, res: express.Response) {
  var alunosAlocados: Map<string,string[]> = <Map<string,string[]>> req.body; 
  relatorioTurma = AlocacaoDeMonitores.setMonitorAluno(alunosAlocados);
  if (relatorioTurma) {
    res.send({"success": "O aluno foi alocado com sucesso"});
  } else {
    res.send({"failure": "O aluno não pode ser alocado"});
  }
})

app.put('/turma-atual', function (req: express.Request, res: express.Response) {
  var novaTurma: string = <string> req.body; 
  relatorioTurma = cadastroRelatorio.criar(novaTurma);
  if (relatorioTurma) {
    res.send({"success": "A nova turma foi criada com sucesso"});
  } else {
    res.send({"failure": "A nova turma não pode ser cadastrado"});
  }
})

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

function closeServer(): void {
   server.close();
}

export { app, server, closeServer }
