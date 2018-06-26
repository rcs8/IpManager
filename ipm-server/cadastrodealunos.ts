import { Aluno } from '../ipm-gui/src/app/aluno/aluno';

export class CadastroAlunos {
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

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.loginCin == aluno.loginCin);
    if(result) result.copyFrom(aluno);
    return result;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}
