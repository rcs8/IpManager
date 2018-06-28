import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../aluno/aluno';
import { AlunoService } from '../aluno/aluno.service';
import { AulaService} from '../aula/aula.service';

@Component ({
  selector: 'app-root',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {
  constructor(private alunoService: AlunoService, private aulaService: AulaService) {}

  alunos: Aluno[];

  classes: number;

  atualizarAluno(aluno: Aluno): void {
    aluno.classes = this.classes;
    this.alunoService.atualizar(aluno)
         .catch(erro => alert(erro));
    this.alunoService.getAlunos()
        .then(alunos => this.alunos = alunos)
        .catch(erro => alert(erro));
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
        .then(alunos => this.alunos = alunos)
        .catch(erro => alert(erro));
    this.aulaService.getAulas()
        .then(aulas => this.classes = aulas.length)
        .catch(erro => alert(erro));
  }
}
