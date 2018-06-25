import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AlunoRegisterComponent} from './aluno-register.component';

const alunosRoutes: Routes = [
  {path: 'register', redirectTo: '/alunoregister'},
  {path: 'alunoregister', component: AlunoRegisterComponent}
];

@NgModule({
  imports:[
    RouterModule.forChild(alunosRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AlunoRoutingModule {}
