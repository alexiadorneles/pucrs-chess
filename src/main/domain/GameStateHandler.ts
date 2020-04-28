import { ChessFactory } from '../factory/ChessFactory'
import { DOMGenerator } from '../DOMGenerator'
import { Board } from './board/Board'
import Axios from 'axios'
import { API } from '../constants/config'

export class GameStateHandler {
  constructor(private chessFactory: ChessFactory, private domGenerator: DOMGenerator) {
    this.newGame = this.newGame.bind(this)
    this.loadGame = this.loadGame.bind(this)
  }

  public newGame(): void {
    const initialBoard = new Board().init()
    this.domGenerator.injectBoard(initialBoard)
    this.domGenerator.refresh()
  }

  public async loadGame(): Promise<void> {
    const response = await Axios.get(API.LOAD_URL)
    const board = this.chessFactory.createBoardFromJSON(response.data)
    this.domGenerator.injectBoard(board)
    this.domGenerator.refresh()
  }
}
