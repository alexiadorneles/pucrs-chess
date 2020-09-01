import { GameStateHandler } from './domain/GameStateHandler'
import { DOMGenerator } from './DOMGenerator'
import { ChessFactoryImpl } from './factory/ChessFactory'

const domGeneratorInstance = DOMGenerator.getInstance()
const chessFactory = new ChessFactoryImpl()
const gameStateHandler = new GameStateHandler(chessFactory, domGeneratorInstance)

const newGameButton = document.getElementById('novoJogo')
const loadGameButton = document.getElementById('carregarJogo')
const saveGameButton = document.getElementById('salvarJogo')

newGameButton.addEventListener('click', gameStateHandler.newGame)
loadGameButton.addEventListener('click', gameStateHandler.loadGame)
saveGameButton.addEventListener('click', gameStateHandler.saveGame)
