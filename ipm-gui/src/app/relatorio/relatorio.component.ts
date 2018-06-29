import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import {Aluno} from '../aluno/aluno'
import {Turma} from '../turma/turma'
import {AlunoRelatorio} from './AlunoRelatorio'
import {RelatorioTurma} from './TurmaRelatorio'
import {RelatorioService} from './relatorio.service'
import {AlunoService} from '../aluno/aluno.service'


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements OnInit {

   constructor(private relatorioService: RelatorioService, private alunoService: AlunoService) { }

   alunos: AlunoRelatorio[]=[];
   relatTurma: RelatorioTurma[]=[];
   
   getAlunosFromRelatorio(from: RelatorioTurma): AlunoRelatorio[] {
	   this.alunos = from.alunos;
	   return this.alunos;
   }
   
   getNumAlunos(from: RelatorioTurma): number {
	   return from.alunos.length; 
   }

  ngOnInit(): void {
      this.relatorioService.getRelatoriosTurmasAnteriores()
							.then(relatorios = this.relatTurma =relatorios)
							.catch(erro => alert(erro));
   }

}

