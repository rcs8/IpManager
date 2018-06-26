import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgModule} from '@angular/core';

import {Aula} from './aula';
import {AulaService} from './aula.service';
import {AlunoService} from '../aluno/aluno.service';

@Component ({
  selector: 'app-root',
  templateUrl: './chamada.component.html',
  styleUrls: './chamada.component.css'
})
export class ChamadaComponent implements OnInit
{
    aula: Aula = new Aula();
    alunos: Aluno[];
    var value: boolean = false;

    constructor (
      private alunoService: AlunoService,
      private aulaService: AulaService,
      private route: ActivatedRoute
    ) {}

    registrarFalta(aluno: Aluno){
      this.aula.presentes[aluno.loginCin] = !this.aula.presentes[aluno.loginCin];
      this.aulaService.atualizarPresenca(this.aula);
      this.alunoService.registrarFalta(aluno, this.aula.presentes[aluno.loginCin]);
    }

    ngOnInit(){
      this.aula = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')))
    );
      this.alunos = this.alunoService.getAlunos();
    }
}
