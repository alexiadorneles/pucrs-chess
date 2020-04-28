import axios from 'axios'
import { Position } from './definitions/Movement'
import { MovementBuilderMap, PieceBuilderMap } from './domain/PieceBuilder'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Movement } from './domain/movement/Movement'
import { Piece } from './domain/piece/Piece'
import { Tabuleiro } from './domain/Tabuleiro'
import { DOMGenerator } from './DOMGenerator'
import { API } from './config'

type JSONObject = { [key in string]: any }

const buildBoardModel = (loaded: JSONObject) => {
  const board = new Tabuleiro()
  return Object.assign(board, loaded)
}

const buildModelItem = (loaded: JSONObject): ItemTabuleiro => {
  const boardItem = new ItemTabuleiro(loaded.posicao, loaded.cor)
  return Object.assign(boardItem, loaded)
}

const buildModelPiece = (loaded: JSONObject): Piece => {
  const clazz = PieceBuilderMap.get(loaded.tipo)
  const piece = new clazz(loaded.cor)
  const model: Piece = Object.assign(piece, loaded)
  const movements = model.getMovements().map(mov => buildMovementModel(mov))
  model.setMovements(movements)
  return model
}

const buildMovementModel = (loaded: JSONObject) => {
  const clazz = MovementBuilderMap[loaded.tipo]
  const movement: Movement = new clazz()
  return Object.assign(movement, loaded)
}

const initialBoard = new Tabuleiro().gerarTabuleiroInicial()
const newGame = () => {
  DOMGenerator.getInstance().injectBoard(initialBoard)
  DOMGenerator.getInstance().refresh()
}

const loadGame = async () => {
  const response = await axios.get(API.URL)
  const board = buildBoardModel(response.data)

  board.percorrerTabuleiro((item: JSONObject, { line: linha, column: coluna }: Position) => {
    const itemModel = buildModelItem(item)
    if (itemModel.getPeca()) {
      const pieceModel = buildModelPiece(itemModel.getPeca())
      itemModel.atribuirPeca(pieceModel)
    }
    board.posicoes[linha][coluna] = itemModel
    itemModel.adicionarAoTabuleiro(board)
  })

  DOMGenerator.getInstance().injectBoard(board)
  DOMGenerator.getInstance().refresh()
}

const newGameButton = document.getElementById('novoJogo')
const loadGameButton = document.getElementById('carregarJogo')
const saveGameButton = document.getElementById('salvarJogo')

newGameButton.addEventListener('click', newGame)
loadGameButton.addEventListener('click', loadGame)
saveGameButton.addEventListener('click', () =>
  DOMGenerator.getInstance()
    .getBoard()
    .salvar(),
)
