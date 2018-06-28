import {Aluno} from '../aluno/aluno';
import {Turma} from '../turma/turma';
import {AlunoRelatorio} from './AlunoRelatorio';


export class RelatorioTurma{
	nomeTurma: string;
	alunos: AlunoRelatorio[] =[];
	
	constructor(nomeTurma: string){
		this.nomeTurma = nomeTurma;
	}
	
	getMedia(from: Aluno): number{
		var media: number;
	if(from.getAverage() <= 7){
		media=from.getAverage();
		}else{
		media=from.getFinalAverage();
		}
		return media;
	}
	
	gerarRelatorioAlunoUm(from: Aluno): void {
		var newAluno = new AlunoRelatorio("",0,0,"");
		newAluno.loginCin=from.loginCin;
		newAluno.media = this.getMedia(from);
		newAluno.presenca=from.getAbsence();
		newAluno.stts=from.getStatus();
		this.alunos.push(newAluno);
	}
	
	gerarRelatorioAluno(loginCin: string, media: number, presenca: number, stts: string): void {
		var aluno=new AlunoRelatorio(loginCin,media,presenca,stts);
		this.alunos.push(aluno);
	}
	
	gerarRelatorioFinal(from: Turma): void{
		this.nomeTurma=from.nomeTurma;
		var alunosRecieved = from.alunos;
		for (let i in from){
			this.gerarRelatorioAlunoUm(alunosRecieved[i]);
		}
	}
	
	getAlunos(): AlunoRelatorio[] {
		return this.alunos;
	}
	
}