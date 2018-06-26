import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotasComponent } from './notas/notas.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AulaComponent } from './aula/aula.component';
import { ChamadaComponent } from './chamda/chamada.component';
import { AlunoService } from './aluno/aluno.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    NotasComponent,
    AulaComponent,
    ChamadaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: 'register',
        component: AlunoComponent
      },
      {
        path: 'notas',
        component: NotasComponent
      },
      {
        path: 'aulas',
        component: AulaComponent
      },
      {
        path: 'aulas/:id',
        component: ChamadaComponent
      }
    ])
  ],
  providers: [AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
