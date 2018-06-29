import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';

import { RelatorioService } from './relatorio/relatorio.service';
import { AppComponent } from './app.component';
import { RelatorioComponent } from './relatorio/relatorio.component';
import { AlunoNotasComponent } from './aluno-notas/aluno-notas.component';
import { AlocaçaoMonitoresComponent } from './alocaçao-monitores/alocaçao-monitores.component';
import { MonitorComponent } from './monitor/monitor.component';
import { AlunoComponent } from './aluno/aluno.component';
import { AlunoService } from './aluno/aluno.service';
import { AlocaçaoMonitoresService } from './alocaçao-monitores/alocaçao-monitores.service';
import { TurmaAtualComponent} from './turma/turmaAtual.component';


@NgModule({
  declarations: [
    AppComponent,
    RelatorioComponent,
    AlunoNotasComponent,
    AlocaçaoMonitoresComponent,
    MonitorComponent,
    AlunoComponent,
    TurmaAtualComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule, 
    RouterModule.forRoot([
      {
        path: 'relatorio',
        component: RelatorioComponent
      },
	  {
		path: 'turmaAtual',
        component: TurmaAtualComponent
	  },
      {
        path: 'aluno-notas:loginCin',
        component: AlunoNotasComponent
      },
	  {
		path: 'alocacao',
        component:AlocaçaoMonitoresComponent
	  }
    ])
  ],
  providers: 
	[RelatorioService,
	AlunoService,
	AlocaçaoMonitoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
