import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina Relatorios Turma$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
        await $("a[name='RelatoriosTurma']").click();
		var alunos: AlunoService();
    })
	
	Given(/^existe uma turma registrada como "([^\"]*)" com o aluno "([^\"]*)" com notas "7", "7", "8", "8" nas lista e "8", "7" nas provas, e "80%" de presença e com o aluno "([^\"]*)" com notas "8", "8", "8", "8" nas lista e "8", "8" nas provas, e "75%" de presença $/,
	async (turma,nome, lst1,lst2,lst3,lst4,av1,av2,pr) => {
		var relatorio: new Relatorio(turma);
		aluno.atribuiNotas(lst1,lst2,lst3,lst4,av1,av2);
		aluno.presença(66);
		alunos.newAluno(aluno);
	});
	
	When(/^eu peço o relatorio de turmas anteriores$/, async () => {
	
	});
	
	When(/^eu peço os relatorios individuais de alunos$/, async () => {
		
	
	});
	
	
	Then(/^aparece o aluno "([^\"]*)", media "(\d*)", presença "(\d*)" e status "([^\"]*)"$/, async (nome,media,pres,stt) => {
		var allalunos: ElementArrayFinder = element.all(by.name('alunolist'));
		allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name), sameMedia(elem,media))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
	});
	
	Given(/^existe o aluno "([^\"]*)" com notas "(\d*)", "(\d*)", "(\d*)", "(\d*)" nas lista e "(\d*)", "(\d*)" nas provas, e "(\d*)" de presença $/,
	async (nome, lst1,lst2,lst3,lst4,av1,av2,pr) => {
		var aluno: new Aluno(nome);
		var media = aluno.calculoMedia(lst1,lst2,lst3,lst4,av1,av2);
		alunoRelatorio: AlunoRelatorio(nome,media,pr,aluno.getStatus());
		Relatorio
	});

})
