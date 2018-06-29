import { Turma } from '../ipm-gui/src/app/turma/turma';
import { RelatorioTurma } from '../ipm-gui/src/app/relatorio/TurmaRelatorio';
import 

export class CadastroDeRelatorios {
  turmasAnteriores: RelatorioTurma[] = [];

  fecharTurmaAtual(turma: RelatorioTurma): RelatorioTurma {
    var result = null;
    result = new RelatorioTurma();
	result.nomeTurma = turma.nomeTurma;
	result.alunos = turma.alunos;
    this.turmasAnteriores.push(result);
    return result;
  }

  getRelatoriosTurmas(): RelatorioTurma[] {
    return this.turmasAnteriores;
  }

}