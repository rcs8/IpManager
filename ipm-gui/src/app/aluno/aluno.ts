export class Aluno{
  id: number;
  loginCin: string;
  loginHuxley: string;
  senha: string;
  listas: Map<string,number>;
  provas: Map<string,number>;
  miniprojeto: number;
  media: number;
  mediaFinal: number;
  final: number;
  faltas: number;
  classes: number;
  status: string;
  percentage: number;


  constructor(){
    this.clean();
  }

  clean(){
    this.id = 0;
    this.loginCin = "";
    this.loginHuxley = "";
    this.senha = "";
    this.listas = new Map<string,number>();
    this.provas = new Map<string,number>();
    this.miniprojeto = 0;
    this.media = 0;
    this.final = 0;
    this.mediaFinal = 0;
    this.faltas = 0;
    this.classes = 0;
    this.percentage = 0;
    this.status = "";
  }

  clone():Aluno{
    var aluno: Aluno = new Aluno();
    aluno.listas = new Map<string,number>();
    aluno.provas = new Map<string,number>();
    aluno.copyFrom(this);
    return aluno;
  }

  copyFrom(from: Aluno): void {
    this.id = from.id;
    this.loginCin = from.loginCin;
    this.loginHuxley = from.loginHuxley;
    this.senha = from.senha;
    this.copyNotasFrom(from);
    this.faltas = from.faltas;
    this.media = this.getAverage();
    this.mediaFinal = this.getFinalAverage();
    this.classes = from.classes;
    this.percentage = this.getAbsence(this.classes);
    this.status = this.getStatus(this.classes);
  }

  copyNotasFrom(from: Aluno): void {
    this.listas = new Map<string,number>();
    this.provas = new Map<string,number>();
    for(let key in from.listas){
      this.listas[key] = from.listas[key];
    }

    for(let key in from.provas){
      this.provas[key] = from.provas[key];
    }
    this.miniprojeto = from.miniprojeto;
    this.final = from.final
  }

  getAverage(): number{
    var average : number = 0;

    for(let key in this.listas){
      average = average + (this.listas[key] * 2)
    }
    for(let key in this.provas){
      average = average + (this.provas[key] * 7)
    }
    average = average + (this.miniprojeto * 1);

    return average / 34;
  }

  getFinalAverage(): number{
    var finalAverage : number = 0;
    var average : number = this.getAverage();
    finalAverage = (average + this.final)/ 2;
    return finalAverage;
  }

  getAbsence(classes: number) : number {
    var absence : number = 0;
    absence = this.faltas / classes;
    if(absence > 1){
      absence = 1;
    }
    return absence * 100;
  }

  getStatus(classes: number) : string {
    var status : string = "";
    var abscence : number = this.getAbsence(classes);
    if(abscence > 25){
      status = "Reprovado por Falta";
    } else {
      var average : number = this.getAverage();
      if(average >= 7) {
        status = "Aprovado por média";
      } else {
        var finalAverage : number = this.getFinalAverage();
        if(finalAverage >= 5){
          status = "Aprovado";
        } else {
          status = "Reprovado";
        }
      }
    }
    return status;
  }
}
