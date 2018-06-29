import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameLogin = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));
let sameMedia = ((elem, media) => elem.element(by.name('medialist')).getText().then(text => text === media));
let sameStatus = ((elem, stts) => elem.element(by.name('statuslist')).getText().then(text => text === stts));
let samePresença = ((elem, presença) => elem.element(by.name('preslist')).getText().then(text => text === presença));

let cadastrarAluno = ((login) => {
    await $("a[name='cadastro']").click();
    await $("input[name='loginCin']").sendKeys(<string> login);
    await $("input[name='loginHuxley']").sendKeys(<string> login);
    await $("input[name='password']").sendKeys(<string> login);
    await element(by.buttonText('Cadastrar')).click();
});

let setNotas = ((aluno,lst1,lst2,lst3,lst4,lst5,lst6,av1,av2,av3,mp) => {
	await $("a[name='notas']").click();
	await $("input[name='lista1']").sendKeys(<string> lst1);
	await $("input[name='lista2']").sendKeys(<string> lst2);
	await $("input[name='lista3']").sendKeys(<string> lst3);
	await $("input[name='lista4']").sendKeys(<string> lst4);
	await $("input[name='lista5']").sendKeys(<string> lst5);
	await $("input[name='lista6']").sendKeys(<string> lst6);
	await $("input[name='EE1']").sendKeys(<string> av1);
	await $("input[name='EE2']").sendKeys(<string> av2);
	await $("input[name='EE1']").sendKeys(<string> av3);
	await $("input[name='miniprova']").sendKeys(<string> mp);
})

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Eu estou na pagina Relatorios Turma$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
        await $("a[name='relatorio']").click();
    })
	
	Given(/^existe o aluno "([^\"]*)" com notas "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)", "(\d*)" nas lista e "(\d*)", "(\d*)", "(\d*)" nas provas e "(\d*)" no mineprojeto $/,
	async (nome, lst1,lst2,lst3,lst4,lst5,lst6,av1,av2,av3,mp) => {
		cadastrarAluno(nome);
		setNotas(lst1,lst2,lst3,lst4,lst5,lst6,av1,av2,av3,mp);		
	});
	
	Given(/^Eu sou o aluno "([^\"]*)"$/, async(nome) => {
		await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
		cadastrarAluno(nome);
	})
	
	Given(/^tenho as notas "(\d*)", "(\d*)", "(\d*)", "(\d*)" nas lista e "(\d*)", "(\d*)" nas provas, e "(\d*)" de presença$/,
	async(ls1,ls2,ls3,ls4,av1,av2,pres) => {
		alunoTemp = new Aluno(getLoginName());
		alunoTemp.setNotas(lst1,lst2,lst3,lst4,av1,av2);
		alunoTemp.setPresença(pr);
		getAlunoService().getAlunoByName(getLoginName()).clone(alunoTemp);

	})
	
	When(/^eu peço o relatorio de turmas anteriores$/, async () => {
		await $("a[name='relatorio']").click();
	});
	
	When(/^eu peço os relatorios da turma atual $/, async () => {
		await $("a[name='turmaAtual']").click();
	});
	
	Then(/^aparece o aluno "([^\"]*)", media "(\d*)", presença "(\d*)" e status "([^\"]*)"$/, async (nome,media,pres,stt) => {
		var alunos : ElementArrayFinder = element.all(by.name('relatorioturma'));
		alunos.filter(elem => pAND(pAND(sameLogin(elem,name),sameMedia(elem,media)),pAND(sameStatus(elem,stt),samePresença(elem,pres))));
	});

})
