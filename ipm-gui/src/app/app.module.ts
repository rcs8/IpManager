import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NotasComponent } from './notas/notas.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoService } from './aluno/aluno.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunoComponent,
    NotasComponent,
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
      }
    ])
  ],
  providers: [AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
