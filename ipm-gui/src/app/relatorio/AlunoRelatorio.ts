

export class AlunoRelatorio{
	loginCin: string;
	media: number;
	presenca: number;
	stts: string;

	constructor(loginCin: string,media: number,presenca: number,stts: string) {
		this.loginCin=loginCin;
		this.media=media;
		this.presenca=presenca;
		this.stts=stts;
	}
	
	copyFrom(from: AlunoRelatorio): void {
		this.loginCin=from.loginCin;
		this.media=from.media;
		this.presenca=from.presenca;
		this.stts=from.stts;
	}
	
}
