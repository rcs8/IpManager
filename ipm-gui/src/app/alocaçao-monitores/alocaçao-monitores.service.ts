import { Monitor } from '../monitor/monitor';
import { Aluno } from '../aluno/aluno';
import { Injectable } from '@angular/core';


@Injectable()
export class AlocaçaoMonitoresService {
	monitores: Monitor[]=[];
	allAlunos: Aluno[]=[];
	
  constructor() { }  

  getMonitores(): Monitor[]{
	  return this.monitores;
  }
  
  getAllAlunos(): Aluno[]{
	  return this.allAlunos;
  }
  
  atualizarMonitores(): void{
	  
  }
  
  
  
  alocarMonitorAluno(monitor: Monitor, aluno: Aluno): string {
	  return "sucesso";
  }
  
  
}