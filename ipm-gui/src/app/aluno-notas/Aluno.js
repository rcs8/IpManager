"use strict";
exports.__esModule = true;
var Aluno = /** @class */ (function () {
    function Aluno() {
        this.clean();
        this.provas = new Map();
        this.listas = new Map();
    }
    Aluno.prototype.clean = function () {
        this.id = 0;
        this.loginCin = "";
        this.loginHuxley = "";
    };
    Aluno.prototype.clone = function () {
        var aluno = new Aluno();
        /* aluno.nome = this.nome;
        aluno.cpf = this.cpf;
        aluno.email = this.email; */
        return aluno;
    };
    /*   cloneMetas(): Map<string,string> {
        var metas: Map<string,string> = new Map<string,string>();
        for (let key in this.metas) {
          metas[key] = this.metas[key];
        }
        return metas;
      } */
    Aluno.prototype.getAverage = function () {
        return 7.5;
    };
    Aluno.prototype.getStatus = function () {
        return "aprovado";
    };
    Aluno.prototype.getPresenca = function () {
        return 75;
    };
    return Aluno;
}());
exports.Aluno = Aluno;
