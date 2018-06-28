import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {Aluno} from '../aluno/aluno'
import {Turma} from '../turma/turma'
import {AlunoRelatorio} from './AlunoRelatorio'
import {RelatorioTurma} from './TurmaRelatorio'
import {RelatorioService} from './relatorio.service'

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

   constructor(private relatorioService: RelatorioService) { }

   alunos: AlunoRelatorio[]=[];
   relatTurma: RelatorioTurma[]=[];
   
   getAlunosFromRelatorio(from: RelatorioTurma): AlunoRelatorio[] {
	   this.alunos = from.alunos;
	   return this.alunos;
   }
   
   getNumAlunos(from: RelatorioTurma): number {
	   return from.alunos.length; 
   }
  
  getRelatoriosAnteriores(): RelatorioTurma[] {
	  return this.relatorioService.getRelatoriosTurmasAnteriores()
  }

  ngOnInit(): void {
     this.relatTurma =this.relatorioService.getRelatoriosTurmasAnteriores()
   }

}

