import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Monitor } from '../monitor/monitor';
import { Aluno } from '../aluno/aluno';
import { AlocaçaoMonitoresService } from './alocaçao-monitores.service';
import { AlunoService } from '../aluno/aluno.service';
import { MonitorService } from '../monitor/monitor.service';


@Component({
  selector: 'app-alocaçao-monitores',
  templateUrl: './alocaçao-monitores.component.html',
  styleUrls: ['./alocaçao-monitores.component.css']
})
export class AlocaçaoMonitoresComponent implements OnInit {
  private headers = new Headers({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private alocaçaoService: AlocaçaoMonitoresService, private alunoService: AlunoService,
  private monitorService: MonitorService) { }
  monitorAlunosList: Map<string,string[]>;
  allMonitorName: string[] = [];
  alunosNaoAlocados: string[] = [];
  monitorTemp: string;
  alunoTemp: string;
  maxMonitores: number;
  
  quantidadeAlunosMonitor(monitor: string): number{
		return this.alocaçaoService.getAlunosAlocados(monitor).length;
	}
	
  alocarMonitorAluno(): void{
	  if(this.quantidadeAlunosMonitor(this.monitorTemp) <= this.maxMonitores){
		console.log("Nao é permitido atribuir outro aluno a esse monitor. Limite estrapolado");
	  }else{
		this.alocaçaoService.alocarMonitorAluno(this.monitorTemp,this.alunoTemp)
												.then(monitor => this.monitorTemp = monitor)
												.catch(erro => alert(erro));
	  }
  }
  
  getAlunosAlocados(from: string): string[]{
	   return this.alocaçaoService.getAlunosAlocados(from);
  }
	
	 existeAluno(loginCin: string): number{
		return this.alocaçaoService.alunosNaoAlocados.filter(a => a == loginCin).length;
	}
	
	existeMonitor(loginCin: string): number{
		return this.alocaçaoService.alunosNaoAlocados.filter(a => a == loginCin).length;
	}
	
	setMaxMonitores(novoMax: number): void{
		this.alocaçaoService.maxMonitores = novoMax;
		this.maxMonitores = novoMax;
	}
	
	procurarMonitorName(monitor: string): string{
		return this.monitorAlunosList[this.alocaçaoService.procurarMonitorKey(monitor)];
	}
	
	getAllMonitorsName(): void{
		for(let i in this.alocaçaoService.allMonitor){
			this.allMonitorName.push(this.alocaçaoService.allMonitor[i].loginCin);
		}
	}

  ngOnInit() {
	  this.maxMonitores = this.alocaçaoService.maxMonitores;
	  this.alunoService.getAlunos()
		.then(alunos =>this.alocaçaoService.allAlunos = alunos)
		.catch(erro => alert(erro));
	  this.monitorService.getMonitores()
	    .then(monitores =>this.alocaçaoService.allMonitor = monitores)
		.catch(erro => alert(erro));
	  this.monitorAlunosList = this.alocaçaoService.getMonitoresAluno();
	  this.alunosNaoAlocados =  this.alocaçaoService.getAlunosNaoAlocados();
  }

}
