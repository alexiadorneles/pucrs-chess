import { ChessFactory } from '../factory/ChessFactory'
import { DOMGenerator } from '../DOMGenerator'
import { Board } from './board/Board'
import Axios from 'axios'
import { API } from '../constants/config'

export class GameStateHandler {
  constructor(private chessFactory: ChessFactory, private domGenerator: DOMGenerator) {
    this.newGame = this.newGame.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.saveGame = this.saveGame.bind(this)
  }

  public newGame(): void {
    const initialBoard = this.chessFactory.createInitialBoard()
    this.domGenerator.injectBoard(initialBoard)
    this.domGenerator.refresh()
  }

  public async loadGame(): Promise<void> {
    const response = await Axios.get(API.LOAD_URL)
    const board = this.chessFactory.createBoardFromJSON(response.data)
    this.domGenerator.injectBoard(board)
    this.domGenerator.refresh()
  }

  public async saveGame(): Promise<void> {
    this.domGenerator.getBoard().cleanCircularReferences()
    const content = JSON.stringify((this.domGenerator.getBoard() as any).board)
    const config = { headers: { 'Content-Type': 'application/json' } }
    const data = { json: content }
    await Axios.post(API.SAVE_URL, data, config)
    alert('Jogo salvo')
  }
}
