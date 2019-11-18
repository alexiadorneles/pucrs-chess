"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tabuleiro_1 = require("./domain/Tabuleiro");
var DOMGenerator_1 = require("./DOMGenerator");
var tabuleiroInicial = new Tabuleiro_1.Tabuleiro().gerarTabuleiroInicial();
DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial);
var novoJogo = function (event) {
    DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial);
    DOMGenerator_1.DOMGenerator.getInstance().refresh();
};
var carregarJogo = function (event) { console.log('carregar pressed '); };
var novoJogoButton = document.getElementById('novoJogo');
var carregarJogoButton = document.getElementById('carregarJogo');
var salvarJogoButton = document.getElementById('salvarJogo');
novoJogoButton.addEventListener('click', novoJogo);
carregarJogoButton.addEventListener('click', carregarJogo);
carregarJogoButton.addEventListener('click', DOMGenerator_1.DOMGenerator.getInstance().getTabuleiro().salvar);
