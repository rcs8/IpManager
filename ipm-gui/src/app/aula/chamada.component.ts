import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {NgModule} from '@angular/core';

import {Aula} from './aula';
import {Aluno} from '../aluno/aluno';
import {AulaService} from './aula.service';
import {AlunoService} from '../aluno/aluno.service';

@Component ({
  selector: 'app-root',
  templateUrl: './chamada.component.html',
  styleUrls: ['./chamada.component.css']
})
export class ChamadaComponent implements OnInit
{
  constructor (
    private alunoService: AlunoService,
    private aulaService: AulaService,
    private route: ActivatedRoute
  ){}
    classes: number;
    alunos: Aluno[];
    selectedId : number;

    registrarFalta(aluno: Aluno){
      aluno.classes = this.classes;
      aluno.faltas = aluno.faltas + 1;
      this.alunoService.atualizar(aluno);
      this.alunoService.getAlunos()
          .then(as => this.alunos = as)
          .catch(erro => alert(erro));
    }

    ngOnInit(){
      this.route.paramMap.subscribe(params => {
        this.selectedId = +params.get('id');
      });

      this.aulaService.getAulas()
         .then(as => this.classes = as.length)
         .catch(erro => alert(erro));
      this.alunoService.getAlunos()
          .then(as => this.alunos = as)
          .catch(erro => alert(erro));

    }

}
