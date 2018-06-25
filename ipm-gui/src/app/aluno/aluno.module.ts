import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AlunoRegisterComponent} from './aluno-register.component';

import {AlunoService} from './aluno.service';

import {AlunoRoutingModule} from './aluno-routing.module';

@NgModule([
  imports:[
    BrowserModule,
    FormsModule,
    AlunoRoutingModule
  ],
  declarations: [
    AlunosRegisterComponent
  ],
  providers: [AlunoService]
])

export class HeroesModule {}
