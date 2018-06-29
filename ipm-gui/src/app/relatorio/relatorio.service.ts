import { RelatorioTurma } from './TurmaRelatorio';
import { AlunoRelatorio } from './AlunoRelatorio';
import { Turma } from '../turma/turma';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';

@Injectable()
export class RelatorioService {
	turmasAnteriores: RelatorioTurma[]=[];
	turmaAtual: Turma;
	
	private headers = new Headers({'Content-Type': 'application/json'});
	private ipmURL = 'http://localhost:3000';
	
  constructor(private http: Http ) {  }
  
	setTurmaAtual(alunos: Aluno[]): Turma{
		this.turmaAtual = new Turma("2018.1");
		this.turmaAtual.alunos = alunos;
		return this.turmaAtual;
	}
  
  getRelatoriosTurmasAnteriores(): Promise<RelatorioTurma[]> {
	  return this.http.get(this.ipmURL + "/relatorio").toPromise()
				.then(res => res.json() as RelatorioTurma[])
				.catch(this.tratarErro);
  }
  
  adicionarRelatorioTurma(relatorioTurma: RelatorioTurma): void{
	  this.turmasAnteriores.push(relatorioTurma);
  }
  
	gerarRelatorio(from: Turma, value: boolean): RelatorioTurma{
		var nomeTurma: string;
		var relatorioTurma: RelatorioTurma;
		nomeTurma=from.nomeTurma;
		relatorioTurma =  new RelatorioTurma(nomeTurma);
		var alunosRecieved = from.alunos;
		for (let i in from){
			relatorioTurma.gerarRelatorioAlunoUm(alunosRecieved[i]);
		}
		if(value){
		this.adicionarRelatorioTurma(relatorioTurma);
		}
		return relatorioTurma;
	}

	private tratarErro(erro: any): Promise<any>{
		console.error('Acesso mal sucedido ao serviço de alunos',erro);
		return Promise.reject(erro.message || erro);
 }
  
  
}

