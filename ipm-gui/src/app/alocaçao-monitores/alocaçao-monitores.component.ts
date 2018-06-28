import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Monitor } from '../monitor/monitor';
import { Aluno } from '../aluno/aluno';
import { AlocaçaoMonitoresService } from './alocaçao-monitores.service';


@Component({
  selector: 'app-alocaçao-monitores',
  templateUrl: './alocaçao-monitores.component.html',
  styleUrls: ['./alocaçao-monitores.component.css']
})
export class AlocaçaoMonitoresComponent implements OnInit {

  constructor(private alocaçaoService: AlocaçaoMonitoresService) { }
  alunosNaoAlocados: Aluno[] = [];
  monitores: Monitor[] = [];
  alunosAlocadosMonitor: Aluno[] = [];
  monitorTemp: Monitor;
  alunoTemp: Aluno;
  maxMonitores: number;
  
  quantidadeAlunosMonitor(monitor: Monitor): number{
		return monitor.getAlunosAlocados().length;
	}
	
  alocarMonitorAluno(monitor: Monitor,aluno: Aluno): void{
	  if(this.quantidadeAlunosMonitor(monitor) <= this.maxMonitores){
		console.log("Nao é permitido atribuir outro aluno a esse monitor. Limite estrapolado");
	  }else{
		this.alocaçaoService.alocarMonitorAluno(monitor,aluno);
	  }
  }
  
  getAlunosAlocados(from: Monitor): Aluno[]{
	   this.alunosAlocadosMonitor = from.getAlunosAlocados();
	  return this.alunosAlocadosMonitor;
  }
  
  getAlunosNaoAlocados(): Aluno[]{
	  for(let i in this.monitores){
		  this.alunosAlocadosMonitor = this.getAlunosAlocados(this.monitores[i]);
		  for (let j in this.alunosAlocadosMonitor){
		  this.alunosNaoAlocados.filter(a => a.loginCin != this.alunosAlocadosMonitor[j].loginCin);
		  }
	  }
	  return this.alunosNaoAlocados;
	}
	
	existeAlunoNaoAlocado(loginCin: string): number{
		return this.alunosNaoAlocados.filter(a => a.loginCin === loginCin).length;
	}
	
	setMaxMonitores(novoMax: number): void{
		this.maxMonitores = novoMax;
	}

  ngOnInit() {
	  this.monitores = this.alocaçaoService.getMonitores();
	  this.alunosNaoAlocados = this.alocaçaoService.getAllAlunos();
	  this.alunoTemp = new Aluno();
	  this.monitorTemp = new Monitor();
  }

}
