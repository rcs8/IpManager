import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameLogin = ((elem, loginCin) => elem.element(by.name('loginCinlist')).getText().then(text => text === loginCin));
let sameName = ((elem, classDesc) => elem.element(by.name('classesList')).getText().then(text => text === classDesc));
let sameAbsence = ((elem, faltas) => elem.element(by.name('absenceList')).getText().then(text => text === faltas));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)));

defineSupportCode(function({Given,When,Then}){
  Given(/^Given I am at the classes page$/, async() => {
    await browser.get("http://localhost:4200/");
    await expect (browser.getTitle()).to.eventually.equal('IpmGui');
    await $("a[name='classes']").click();
  })
  Given(/^Given I have "([^\"]*)" registered as a student$/, async(loginCin) => {
    await $("a[name='cadastro']").click();
    await $("input[name='loginCin']").sendKeys(<string> loginCin);
    await $("input[name='loginHuxley']").sendKeys(<string> loginCin);
    await $("input[name='senha']").sendKeys(<string> loginCin);
    await element(by.buttonText('Cadastrar')).click();

    var allLogins : ElementArrayFinder = element.all(by.name('loginCinlist'));
    allLogins.filter(elem => sameLogin(elem, loginCin)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));

    await $("a[name='classes']").click();
  })
  Given(/^Given I have the class with day "([^\"]*)" and description "([^\"]*)" in the list$/, async(day, description) => {
    await $("input[name='day']").sendKeys(<string> day);
    await $("input[name='description']").sendKeys(<string> description);
    await element(by.buttonText('Cadastrar')).click();

    var allClasses : ElementArrayFinder = element.all(by.name('classesList'));
    allClasses.filter(elem => sameName(elem, description)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
  })
  When(/^I try to submit "([^\"]*)" attendance$/, async(loginCin) => {
    await $("a[name='class']").click();
    await element(by.buttonText('Falta')).click();
  })
  Then(/^The student "([^\"]*)" will have "(\d*)" abscence$/, async(loginCin, faltas) => {
    var allAlunos : ElementArrayFinder = element.all(by.name('alunolist'));
    allAlunos.filter(elem => pAND(sameLogin(elem, loginCin),sameAbsence(elem,faltas))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
  })
})
