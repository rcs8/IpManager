import { Aluno } from './aluno';

export class AlunoService {
  alunos: Aluno[] = [];

  criar(aluno: Aluno): Aluno {
    var result = null;
    if(this.logincinNaoCadastrado(aluno.loginCin)){
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  logincinNaoCadastrado(login: string): boolean {
    return !this.alunos.find(a => a.loginCin == login);
  }

  atualizarNotas(aluno: Aluno): void {
    aluno = aluno.clone();
    for(let a of this.alunos){
      if(a.loginCin == aluno.loginCin){
        a.listas = aluno.listas;
        a.provas = aluno.provas;
        a.miniprojeto = aluno.miniprojeto;
        a.final = aluno.final;
      }
    }
  }

  marcarFalta(aluno: Aluno): void {
    aluno = aluno.clone();
    for(let a of this.alunos){
      if(a.loginCin == aluno.loginCin){
        a.faltas = aluno.faltas;
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
