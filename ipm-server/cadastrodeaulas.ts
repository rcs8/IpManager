import { Aula } from '../ipm-gui/src/app/aula/aula';

export class CadastroAulas {
  aulas: Aula[] = [];

  criar(aula: Aula): Aula {
    var result = null;
    if(this.aulaExistente(aula)){
      result = new Aula();
      result.copyFrom(aula);
      this.aulas.push(aula)
    }
    return result;
  }

  aulaExistente(aula: Aula) : boolean {
    return !this.aulas.find(a => a.dia == aula.dia);
  }

  getAulas() : Aula[] {
    return this.aulas;
  }
}
