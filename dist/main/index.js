"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tabuleiro_1 = require("./domain/Tabuleiro");
var DOMGenerator_1 = require("./DOMGenerator");
var tabuleiroInicial = new Tabuleiro_1.Tabuleiro().gerarTabuleiroInicial();
DOMGenerator_1.DOMGenerator.getInstance().injetarTabuleiro(tabuleiroInicial);
DOMGenerator_1.DOMGenerator.getInstance().refresh();
