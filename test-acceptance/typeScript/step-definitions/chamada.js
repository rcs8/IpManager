"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let sameLogin = ((elem, loginCin) => elem.element(protractor_1.by.name('loginCinlist')).getText().then(text => text === loginCin));
let sameName = ((elem, classDesc) => elem.element(protractor_1.by.name('classesList')).getText().then(text => text === classDesc));
let sameAbsence = ((elem, faltas) => elem.element(protractor_1.by.name('absenceList')).getText().then(text => text === faltas));
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^I am at the classes page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('IpmGui');
        yield protractor_1.$("a[name='classes']").click();
    }));
    Given(/^I have "([^\"]*)" registered as a student$/, (login) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='cadastro']").click();
        yield protractor_1.$("input[name='loginCin']").sendKeys(login);
        yield protractor_1.$("input[name='loginHuxley']").sendKeys(login);
        yield protractor_1.$("input[name='senha']").sendKeys(login);
        yield protractor_1.element(protractor_1.by.buttonText('Cadastrar')).click();
        var allLogins = protractor_1.element.all(protractor_1.by.name('loginCinlist'));
        allLogins.filter(elem => sameLogin(elem, login)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        yield protractor_1.$("a[name='classes']").click();
    }));
    Given(/^I have the class with day "([^\"]*)" and description "([^\"]*)" in the list$/, (dia, descricao) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='day']").sendKeys(dia);
        yield protractor_1.$("input[name='description']").sendKeys(descricao);
        yield protractor_1.element(protractor_1.by.buttonText('Cadastrar')).click();
        var allClasses = protractor_1.element.all(protractor_1.by.name('classesList'));
        allClasses.filter(elem => sameName(elem, descricao)).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
    When(/^I try to submit "([^\"]*)" attendance$/, (loginCin) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("a[name='class']").click();
        yield protractor_1.element(protractor_1.by.buttonText('Falta')).click();
    }));
    Then(/^The student "([^\"]*)" will have "(\d*)" abscence$/, (login, faltas) => __awaiter(this, void 0, void 0, function* () {
        var allAlunos = protractor_1.element.all(protractor_1.by.name('alunolist'));
        allAlunos.filter(elem => pAND(sameLogin(elem, login), sameAbsence(elem, faltas))).then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    }));
});
