export class AlunoRelatorio{
	nome: string;
	media: int;
	presença: int;
	stts: string;

	construtor(nome,media,presença,stts){
		this.nome=nome;
		this.media=media;
		this.presença=presença;
		this.stts=stts;	
	}
	
}
