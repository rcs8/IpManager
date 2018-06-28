import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameNameMonitor = ((elem, name) => elem.element(by.name('nomemonitor')).getText().then(text => text === name));
let sameNameAluno = ((elem, name) => elem.element(by.name('loginAluno')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let alocarMonitor = ((monitor,aluno) => {
	    await $("input[name='monitornamebox']").sendKeys(<string> monitor);
        await $("input[name='alunologinbox']").sendKeys(<string> aluno);
        await element(by.buttonText('Alocar')).click();
});

let cadastrarMonitor = ((monitor) => {
		await $("a[name='cadastrarmonitor']").click();
	    await $("input[class='login-input']").sendKeys(<string> monitor);
		await $("input[class='password-input']").sendKeys(<string> monitor);
        await element(by.buttonText('Registrar')).click();
});

let cadastrarAluno = ((login) => {
    await $("a[name='cadastro']").click();
    await $("input[name='loginCin']").sendKeys(<string> login);
    await $("input[name='loginHuxley']").sendKeys(<string> login);
    await $("input[name='password']").sendKeys(<string> login);
    await element(by.buttonText('Cadastrar')).click();
});


let valorMaximo = ((num) => await $("input[name='maximobox']").sendKeys(<string> num);

defineSupportCode(function ({ Given, When, Then })  {
	
	Given (/^eu vejo uma lista de monitores com o monitor "([^\"]*)" com "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)",	"([^\"]*)" alocados e o monitor "([^\"]*)" com "([^\"]*)" alocados$/,
	async (monitor1,aluno1,aluno2,aluno3,aluno4,aluno5,aluno6,monitor2,alunoM2) => {
		cadastrarMonitor(monitor1);
		cadastrarMonitor(monitor2);
		cadastrarAluno(aluno1);
		cadastrarAluno(aluno2);
		cadastrarAluno(aluno3);
		cadastrarAluno(aluno4);
		cadastrarAluno(aluno5);
		cadastrarAluno(aluno6);
		alocarMonitor(monitor1,aluno1);
		alocarMonitor(monitor1,aluno2);
		alocarMonitor(monitor1,aluno3);
		alocarMonitor(monitor1,aluno4);
		alocarMonitor(monitor1,aluno5);
		alocarMonitor(monitor1,aluno6);
		if(alunoM2 != ""){
			cadastrarAluno(alunoM2);
			alocarMonitor(monitor2,alunoM2);
		}
	});
	Given (/^uma mensagem indicando o máximo de "(\d*)" alunos por monitor$/,
	async (numMaximo) => {
		await $("input[name='maximobox']").sendKeys(<int> numMaximo);
	});
	
    Given(/^Estou na pagina de alocação de monitores$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
        await $("a[name='alocacao']").click();
    })

    When(/^Eu tento alocar o aluno "([^\"]*)" ao monitor "([^\"]*)"$/, async (aluno, monitor) => {
        alocarMonitor(monitor,aluno);
    });
	
    Then(/^eu vejo uma lista de monitores com o monitor "([^\"]*)" com "([^\"]*)","([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)",	"([^\"]*)" alocados e o monitor "([^\"]*)" com "([^\"]*)" alocados$/,
	async (monitor1,aluno1,aluno2,aluno3,aluno4,aluno5,aluno6,monitor2,alunoM2) => {
        var alunosMonitor1 : ElementArrayFinder = element.all(by.name('listamonitoraluno'));
        alunosMonitor1.filter(elem => sameNameMonitor(elem,monitor));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno1));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno2));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno3));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno4));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno5));
		alunosMonitor1.find(elem => sameNameAluno(elem,aluno6));
		
		var alunosMonitor2 : ElementArrayFinder = element.all(by.name('listamonitoraluno'));
        alunosMonitor2.filter(elem => sameNameMonitor(elem,monitor2));
		alunosMonitor1.find(elem => sameNameAluno(elem,alunoM2));
    });
})
