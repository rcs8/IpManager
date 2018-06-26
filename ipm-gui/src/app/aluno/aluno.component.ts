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
  id: number;

  criar(a: Aluno): void {
    a.id = this.id;
    this.alunoService.criar(a).then(ab => {
          if (ab) {
             this.alunos.push(ab);
             this.aluno = new Aluno();
             this.userRegistered = false;
          } else {
             this.userRegistered = true;
          }
       })
       .catch(erro => alert(erro));
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
       .then(as => this.alunos = as)
       .catch(erro => alert(erro));
    if(!this.alunos == null){
      this.id = this.alunos.length + 1;
    }
  }
}
