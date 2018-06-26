export class Aula(){
  id: number;
  dia: string;
  descricao: string;
  presentes: Map<string,boolean>

  constructor(){
    this.clean();
  }

  clean(){
    this.id = 0;
    this.dia = "";
    this.descricao = "";
    this.presentes = new Map<string,boolean>()
  }

  clone(): Aula{
    var aula = new Aula();
    aula.presentes = new Map<string,boolean>();
    aula.copyFrom(this);
    return aula;
  }

  copyFrom(from: Aula):void {
    this.id = from.id;
    this.dia = from.dia;
    this.descricao = from.descricao;
    this.copyPresentStudents(from.presentes);
  }

  copyPresentStudents(from: Map<string,boolean>):void {
    this.presentes = new Map<string,boolean>();
    for(let key in from){
      this.presentes[key] = from[key];
    }
  }
}
