"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChessEngine_1 = require("./ChessEngine");
var GameStateHandler_1 = require("./GameStateHandler");
var DOMGenerator_1 = require("./DOMGenerator");
var ChessFactory_1 = require("./factory/ChessFactory");
var domGeneratorInstance = DOMGenerator_1.DOMGenerator.getInstance();
var chessFactory = new ChessFactory_1.ChessFactoryImpl(new ChessEngine_1.ChessEngine());
var gameStateHandler = new GameStateHandler_1.GameStateHandler(chessFactory, domGeneratorInstance);
var newGameButton = document.getElementById('novoJogo');
var loadGameButton = document.getElementById('carregarJogo');
var saveGameButton = document.getElementById('salvarJogo');
newGameButton.addEventListener('click', gameStateHandler.newGame);
loadGameButton.addEventListener('click', gameStateHandler.loadGame);
saveGameButton.addEventListener('click', gameStateHandler.saveGame);
