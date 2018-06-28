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
    aulas: Aula [];
    aula: Aula = new Aula();
    classes: number;
    alunos: Aluno[];
    selectedId : number;

    registrarFalta(aluno: Aluno){
      aluno.faltas = aluno.faltas + 1;
      this.alunoService.atualizar(aluno);
    }

    ngOnInit(){
      this.route.paramMap.subscribe(params => {
        this.selectedId = +params.get('id');
      });

      this.aulaService.getAulas()
         .then(as => this.aulas = as)
         .catch(erro => alert(erro));
      this.alunoService.getAlunos()
          .then(as => this.alunos = as)
          .catch(erro => alert(erro));

      this.aula = this.aulas.find(a => a.id == this.selectedId);
      this.classes = this.aulas.length;


    }
}
