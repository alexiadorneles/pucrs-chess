import axios from 'axios'
import { API } from './config'
import { JSONObject } from './definitions/JSONObject'
import { Position } from './definitions/Movement'
import { Board } from './domain/board/Board'
import { DOMGenerator } from './DOMGenerator'
import { GameStateHandler } from './domain/GameStateHandler'
import { ChessFactoryImpl } from './domain/ChessFactory'

const domGeneratorInstance = DOMGenerator.getInstance()
const chessFactory = new ChessFactoryImpl()
const gameStateHandler = new GameStateHandler(chessFactory, domGeneratorInstance)

const newGameButton = document.getElementById('novoJogo')
const loadGameButton = document.getElementById('carregarJogo')
const saveGameButton = document.getElementById('salvarJogo')

newGameButton.addEventListener('click', gameStateHandler.newGame)
loadGameButton.addEventListener('click', gameStateHandler.loadGame)
saveGameButton.addEventListener('click', () => domGeneratorInstance.getBoard().save())
