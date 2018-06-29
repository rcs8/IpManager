import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlunoService } from '../aluno/aluno.service';
import { Aluno} from '../aluno/aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './aluno-notas.component.html',
  styleUrls: ['./aluno-notas.component.css']
})

export class AlunoNotasComponent implements OnInit {

  constructor( private alunoService: AlunoService, private route: ActivatedRoute ) { }
  aluno: Aluno;
  loginChamado: string;
  
	setLoginchamado(loginCin: string): void {
		this.loginChamado = loginCin;
	}
	

  ngOnInit() {
	  this.route.paramMap.subscribe(params => {
        this.loginChamado = params.get('loginCin');
      });
	  var alunos: Aluno[] = [];
	  alunos = this.alunoService.getAlunos()
				.then(as => this.alunos = as)
				.catch(erro => alert(erro));
	  this.aluno = alunos.find(elem=>elem.loginCin == this.loginChamado);
  }

}
