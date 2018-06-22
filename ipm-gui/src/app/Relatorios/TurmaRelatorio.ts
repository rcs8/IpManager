import Aluno from './Aluno'

export class RelatorioTurma{
	nomeTurma: string;
	alunos : [];
	
	gerarRelatorioAluno(nome,media,presença,stts){
		aluno=new AlunoRelatorio(nome,media,presença,stts);
		alunos=alunos+aluno;
	}
	
	gerarRelatorioFinal(from: Turma){
		this.nomeTurma=from.nome;
		this.alunos = from.alunos;
	}
	
	gerarRelatorio(alunosRecieve: AlunoService): Relatorio {
		for (let key in alunos){
			var aluno;
			alunos[key] = alunosRecieve;
			
		}		
	}
}