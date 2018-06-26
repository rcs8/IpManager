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
    this.alunoService.atualizarNotas(aluno);
  }

  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos();
    this.classes = this.aulaService.getAulas().length;
  }
}
