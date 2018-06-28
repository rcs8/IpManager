import { RelatorioTurma } from './TurmaRelatorio';
import { AlunoRelatorio } from './AlunoRelatorio';
import { Turma } from '../turma/turma';
import { Injectable } from '@angular/core';

@Injectable()
export class RelatorioService {
	turmasAnteriores: RelatorioTurma[]=[];
	turmaAtual: Turma;
	
  constructor() {  }

	getTurmaAtual(){
		return this.turmaAtual;
	}
  
  getRelatoriosTurmasAnteriores(): RelatorioTurma[]{
	  return this.turmasAnteriores;
  }
  
  adicionarRelatorioTurma(relatorioTurma: RelatorioTurma): void{
	  this.turmasAnteriores.push(relatorioTurma);
  }
  
  
}

