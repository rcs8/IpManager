import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameMedia = ((elem, media) => elem.element(by.name('medialist')).getText().then(text => text === media));
let sameStatus = ((elem, stts) => elem.element(by.name('statuslist')).getText().then(text => text === stts));
let samePresença = ((elem, presença) => elem.element(by.name('preslist')).getText().then(text => text === presença));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina Relatorios Turma$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
        await $("a[name='RelatoriosTurma']").click();
    })
	
	Given(/^existe o aluno "([^\"]*)" com notas "(\d*)", "(\d*)", "(\d*)", "(\d*)" nas lista e "(\d*)", "(\d*)" nas provas, e "(\d*)" de presença $/,
	async (nome, lst1,lst2,lst3,lst4,av1,av2,pr) => {
		var aluno: new Aluno(nome);
		aluno.setNotas(lst1,lst2,lst3,lst4,av1,av2);
		aluno.setPresença(pr);
		
	});
	
	Given(/^Eu sou o aluno "([^\"]*)"$/, async(nome) => {
		await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
		await $("input[name='nomeLogin']").sendKeys(<string> nome);
        await element(by.buttonText('Login')).click();
	})
	
	Given(/^tenho as notas "(\d*)", "(\d*)", "(\d*)", "(\d*)" nas lista e "(\d*)", "(\d*)" nas provas, e "(\d*)" de presença$/,
	async(ls1,ls2,ls3,ls4,av1,av2,pres) => {
		alunoTemp = new Aluno(getLoginName());
		alunoTemp.setNotas(lst1,lst2,lst3,lst4,av1,av2);
		alunoTemp.setPresença(pr);
		getAlunoService().getAlunoByName(getLoginName()).clone(alunoTemp);

	})
	
	When(/^eu peço o relatorio de turmas anteriores$/, async () => {
		await element(by.buttonText("Relatório de Turmas Antigas")).click();
	});
	
	When(/^eu peço os relatorios da turma atual $/, async () => {
		await element(by.buttonText("Relatório da Turma Atual")).click();
	});
	
	Then(/^aparece o aluno "([^\"]*)", media "(\d*)", presença "(\d*)" e status "([^\"]*)"$/, async (nome,media,pres,stt) => {
		var alunos : ElementArrayFinder = element.all(by.name('relatorioturma'));
		alunos.filter(elem => pAND(pAND(sameName(elem,name),sameMedia(elem,media)),pAND(sameStatus(elem,stt),samePresença(elem,pres))));
	});

})
