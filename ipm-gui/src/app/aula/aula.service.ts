import { Injectable } from '@angular/core';
import { Aula } from './aula';

@Injectable ()
export class AulaService {
  aulas: Aula[] = [];

  criar(aula: Aula): Aula {
    aula = aula.clone();
    var result = null;
    if(this.aulaExistente(aula)){
      this.aulas.push(aula);
      result = aula;
    }
    return result;
  }

  aulaExistente(aula: Aula) : boolean {
    return !this.aulas.find(a => a.dia == aula.dia);
  }

  getAulas() : Aula[] {
    var result : Aula[] = [];
    for(let a of this.aulas){
      result.push(a.clone());
    }
    return result;
  }

  getAula(id: number) : Aula {
    var result : Aula = new Aula();
    for(let a of this.aulas){
      if(a.id == id){
        result = a.clone();
      }
    }
    return result;
  }
}
