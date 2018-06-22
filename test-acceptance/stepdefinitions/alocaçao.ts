import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sleep = (ms => new Promise(resolve => setTimeout(resolve, ms)));

let sameName = ((elem, name) => elem.element(by.name('nomelist')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let alocarMonitor = ((monitor,aluno) => {
	    await $("input[name='monitorbox']").sendKeys(<string> monitor);
        await $("input[name='alunobox']").sendKeys(<string> aluno);
        await element(by.buttonText('Alocar')).click();
});

let valorMaximo = ((num) => await $("input[name='maximobox']").sendKeys(<string> num);

defineSupportCode(function ({ Given, When, Then })  {
	
	Given (/^eu vejo uma lista de monitores com o monitor "([^\"]*)" com "([^\"]*)","([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)",	"([^\"]*)" alocados e o monitor "([^\"]*)" com "([^\"]*)" alocados$/,
	async (monitor1,aluno1,aluno2,aluno3,aluno4,aluno5,aluno6,monitor2,alunoM2) => {
		alocarMonitor(monitor1,aluno1);
		alocarMonitor(monitor1,aluno2);
		alocarMonitor(monitor1,aluno3);
		alocarMonitor(monitor1,aluno4);
		alocarMonitor(monitor1,aluno5);
		alocarMonitor(monitor1,aluno6);
	});
	Given (/^uma mensagem indicando o máximo de "(\d*)" alunos por monitor$/,
	async (numMaximo) => {
		await $("input[name='maximobox']").sendKeys(<int> numMaximo);
	});
	
    Given(/^Estou na pagina de alocação de monitores$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('IpManager');
        await $("a[name='monitores']").click();
    })

    When(/^Eu tento alocar o aluno "([^\"]*)" ao monitor "([^\"]*)"$/, async (aluno, monitor) => {
        alocarMonitor(aluno,monitor);
    });
	
    Then(/^And eu vejo uma lista de monitores com o monitor "([^\"]*)" com "([^\"]*)","([^\"]*)", "([^\"]*)", "([^\"]*)", "([^\"]*)",	"([^\"]*)" alocados e o monitor "([^\"]*)" com "([^\"]*)" alocados$/,
	async (monitor1,aluno1,aluno2,aluno3,aluno4,aluno5,aluno6,monitor2,alunoM2) => {
        var allmonitores : ElementArrayFinder = element.all(by.name('monitorslist'));
        allmonitores.filter(elem => sameName(elem,monitor)).filter(elem => );
    });
})
