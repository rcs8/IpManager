import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../aluno/aluno';
import { AlunoService } from '../aluno/aluno.service';

@Component ({
  selector: 'app-root',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})

export class NotasComponent implements OnInit {
  constructor(private alunoService: AlunoService) {}

  alunos: Aluno[];

  classes: number = 60;

  atualizarAluno(aluno: Aluno): void {
    this.alunoService.atualizarNotas(aluno);
  }

  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos();
  }
}
