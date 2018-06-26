import {Component, OnInit} from '@angular/core';
import {NgModule} from '@angular/core';

import {Aula} from './aula';
import {AulaService} from './aula.service';

@Component ({
  selector: 'app-root',
  templateUrl: './aula.component.html',
  styleUrls: ['./aula.component.css']
})
export class AulaComponent implements OnInit
{
   constructor(private aulaService: AulaService){}

   aula: Aula = new Aula();
   aulas: Aula[];
   id: number;

   cadastrar(a: Aula) : void {
     a.id = this.id;
     this.aulaService.criar(a)
        .then(ab => {
           if (ab) {
              this.aulas.push(ab);
              this.aula = new Aluno();
           }
        })
        .catch(erro => alert(erro));
   }

   ngOnInit(): void {
     this.aulaService.getAulas()
        .then(as => this.aulas = as)
        .catch(erro => alert(erro));
     if(!this.aulas == null){
       this.id = this.aulas.length + 1;
     }

   }
}
