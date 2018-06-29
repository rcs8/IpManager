import { Monitor } from './src/app/monitor/monitor';

export class AlocacaoDeMonitores {
	monitorAluno: Map<string,string[]> = new Map<string,string[]>();	

  setMonitorAluno(novoMonitorAluno: Map<string,string[]>): string {
	  this.monitorAluno = novoMonitorAluno;
  }

  getMonitorAluno(): Map<string,string[]> {
      return this.monitorAluno;
  }
}