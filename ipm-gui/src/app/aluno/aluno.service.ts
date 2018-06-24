import { Injectable } from '@angular/core';

import { Aluno } from './aluno';

@Injetctable()
export class AlunoService {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    aluno = aluno.clone();
    var result = null;
    if(this.logincinNaoCadastrado(aluno.loginCin)){
      this.alunos.push(aluno);
      result = aluno;
    }
    return result;
  }

  loginNaoCadastrado(login: string) boolean {
    return !this.alunos.find(a => a.loginCin == login)
  }

  atualizarNotas(aluno: Aluno): void {
    aluno = aluno.clone();
    for(let a of this.alunos){
      if(a.loginCin == aluno.loginCin){
        a.notas = aluno.notas;
      }
    }
  }

  marcarFalta(aluno: Aluno): void {
    aluno = aluno.clone();
    for(let a of this.alunos){
      if(a.loginCin == aluno.loginCin){
        a.faltas = aluno.faltas + 1;
      }
    }
  }

  getAlunos(): Aluno[] {
    var result: Aluno[] = [];
    for(let a of this.alunos){
      result.push(a.clone());
    }
    return result;
  }
}
