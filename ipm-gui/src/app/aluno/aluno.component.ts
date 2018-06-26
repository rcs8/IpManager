import {Component, OnInit} from '@angular/core';
import {NgModule} from '@angular/core';

import {Aluno} from './aluno';
import {AlunoService} from './aluno.service';

@Component ({
  selector:'app-root',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit
{
  constructor(private alunoService: AlunoService) {}

  aluno: Aluno = new Aluno();
  alunos: Aluno[];
  userRegistered: boolean = false;
  id: number = 1;

  criar(a: Aluno): void {
    a.id = this.id;
    if(this.alunoService.criar(a)){
      this.alunos.push(a);
      this.aluno = new Aluno();
      this.userRegistered = false;
      this.id = this.id + 1;
    } else {
      this.userRegistered = true;
      this.aluno = new Aluno();
    }
  }

  ngOnInit(): void {
    this.alunos = this.alunoService.getAlunos();
  }
}
