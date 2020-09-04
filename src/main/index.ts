import { ChessEngine } from './ChessEngine'
import { ChessFactoryImpl } from './factory/ChessFactory'
import { GameStateHandler } from './GameStateHandler'

const chessFactory = new ChessFactoryImpl(new ChessEngine())
const gameStateHandler = new GameStateHandler(chessFactory)

const newGameButton = document.getElementById('novoJogo')
const loadGameButton = document.getElementById('carregarJogo')
const saveGameButton = document.getElementById('salvarJogo')

newGameButton.addEventListener('click', gameStateHandler.newGame)
loadGameButton.addEventListener('click', gameStateHandler.loadGame)
saveGameButton.addEventListener('click', gameStateHandler.saveGame)
