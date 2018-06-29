import { Component, OnInit } from '@angular/core';
import { RelatorioService } from '../relatorio/relatorio.service';
import { AlunoService } from '../aluno/aluno.service';

@Component({
  selector: 'app-turmaAtual',
  templateUrl: './turmaAtual.component.html',
  styleUrls: ['./turmaAtual.component.css']
})
export class TurmaAtualComponent implements OnInit {

  constructor(private relatorioService: RelatorioService, private alunoService: AlunoService) { }
	relatorioTurma: RelatorioTurma;
	
	getTamanhoRelatorioTurma(): number{
		return this.relatorioTurma.alunos.length;
	}

  ngOnInit() {
	  this.alunoService.getAlunos()
		.then(alunos = this.relatorioService.setTurmaAtual(alunos))
		.catch(erro => alert(erro));
	  this.relatorioTurma = this.relatorioService.gerarRelatorio(this.relatorioService.turmaAtual,false);
  }

}
