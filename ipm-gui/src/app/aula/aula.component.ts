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
     if(this.aulaService.criar(a)){
      this.aulas.push(a);
      this.aula = new Aula();
      this.id = this.id + 1;
    } else {
      this.aula = new Aula();
    }
   }

   ngOnInit(): void {
     this.aulas = this.aulaService.getAulas();
     if(this.aulas == null){
       this.id = 1;
     } else {
       this.id = this.aulas.length + 1;
     }

   }
}
