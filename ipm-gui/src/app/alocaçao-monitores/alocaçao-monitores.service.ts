import { Monitor } from '../monitor/monitor';
import { Aluno } from '../aluno/aluno';
import { AlunoService } from '../aluno/aluno.service';
import { MonitorService } from '../monitor/monitor.service';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs';


@Injectable()
export class AlocaçaoMonitoresService {
	monitorAluno: Map<string,string[]>;
	alunosNaoAlocados: string[] = [];
	alunosAlocadosMonitor: string[] = [];
	allAlunos: Aluno[];
	allMonitor: Monitor[];
	maxMonitores: number;
	
	private headers = new Headers({'Content-Type': 'application/json'});
	private ipmURL = 'http://localhost:3000';
	
  constructor(private http: Http) { }  

  getMonitoresAluno(): Map<string,string[]> {
	  this.http.get(this.ipmURL + "/alocacao")
					.then(monitorAluno => this.monitorAluno = monitorAluno)
					.catch(this.tratarErro);
	  return this.monitorAluno;
  }
  
  getAllMonitores(): Monitor[]{
	  return this.allMonitor;
  }
  
  getAlunosNaoAlocados(): string[]{
	  var alunos: Aluno []= [];
	  alunos = this.allAlunos;
	  for(let i in alunos){
		  var aluno: string;
		  aluno = this.procurarAluno(alunos[i].loginCin);
		  if(!aluno){
			  this.alunosNaoAlocados.push(aluno);
		  }
	  }	  
	  return this.alunosNaoAlocados;
  }
  
  
  atualizarMonitores(): void{
	  
  }
  
  procurarAluno(aluno: string): string{
	  var nomeAluno: string;
	  nomeAluno = null;
	  for(let i in this.monitorAluno){
		this.alunosAlocadosMonitor = this.monitorAluno[i];
		this.alunosAlocadosMonitor.find(elem=> elem == aluno);
	  }
	  return nomeAluno;
	}
	
	procurarMonitorKey(monitor: string): string{
	  var nomeMonitor: string;
	  nomeMonitor = null;
	  for(let i in this.monitorAluno){
		  if(i == monitor){
			  nomeMonitor = i;
		  }
	  }
	  return nomeMonitor;
	}
	
	removerAlunoNoMonitor(aluno: string): void {
	  for(let i in this.monitorAluno){
		this.alunosAlocadosMonitor = this.monitorAluno[i];
		this.alunosAlocadosMonitor.filter(elem=> elem !== aluno);
	  }
	}
  
  getAlunosAlocados(monitor: string): string[]{
	  var monitorAux: string;
	  monitorAux = this.procurarMonitorKey(monitor);
	  return this.monitorAluno[''+monitorAux+''];
  }
  
  alocarMonitorAluno(monitor: string, aluno: string): Promise<string> {
	  var key: string;
	  key = this.procurarMonitorKey(monitor);
	  if(key){
		  this.removerAlunoNoMonitor(aluno);
		  this.monitorAluno[''+key+''].push(aluno);
	  }
	  return this.http.put(this.ipmURL + "/alocaçao",JSON.stringify(this.monitorAluno), {headers: this.headers})
         .toPromise()
         .then(res => {
            if (res.json().success) {return monitor;} else {return null;}
         })
         .catch(this.tratarErro);
  }
  
  private tratarErro(erro: any): Promise<any>{
   console.error('Acesso mal sucedido ao serviço de alocaçao de monitores',erro);
   return Promise.reject(erro.message || erro);
 }
  
  
}