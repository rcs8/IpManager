export class Aula {
  id: number;
  dia: string;
  descricao: string;

  constructor(){
    this.clean();
  }

  clean(){
    this.id = 0;
    this.dia = "";
    this.descricao = "";
  }

  clone(): Aula{
    var aula = new Aula();
    aula.copyFrom(this);
    return aula;
  }

  copyFrom(from: Aula):void {
    this.id = from.id;
    this.dia = from.dia;
    this.descricao = from.descricao;
  }
}
