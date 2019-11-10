"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator_1 = require("./DOMGenerator");
var Tabuleiro_1 = require("./domain/Tabuleiro");
var tabuleiro = new Tabuleiro_1.Tabuleiro();
tabuleiro.gerarTabuleiroInicial();
new DOMGenerator_1.DOMGenerator(tabuleiro).generate();
