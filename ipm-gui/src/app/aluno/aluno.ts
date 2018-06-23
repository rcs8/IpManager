export class Aluno{
  nome: string;
  loginCin: string;
  loginHuxley: string;
  notas: Map<string,number>;
  faltas: number;

  constructor(){
    this.clean();
  }

  clean(){
    this.nome = "";
    this.loginCin = "";
    this.loginHuxley = "";
    this.notas = new Map<string,number>();
    this.faltas = 0;
  }

  clone():Aluno{
    var aluno: Aluno = new Aluno();
    aluno.notas = new Map<string,number>();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.loginCin = from.loginCin;
    this.loginHuxley = from.loginHuxley;
    this.faltas = from.faltas;
    this.copyNotasFrom(from.notas);
  }

  copyNotasFrom(from: Map<string,number>): void {
    this.notas = new Map<string,number>();
    for(let index in from){
      this.notas[index] = from[index];
    }
  }
}
