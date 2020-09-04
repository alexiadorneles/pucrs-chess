import Axios from 'axios'
import { Composite } from './composite'
import { API } from './constants/config'
import { DOMGenerator } from './DOMGenerator'
import { ChessFactory } from './factory'
import { BoardAttributes } from './models'

export class GameStateHandler {
  private boardComposite: Composite<BoardAttributes>
  constructor(private chessFactory: ChessFactory) {
    this.newGame = this.newGame.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.saveGame = this.saveGame.bind(this)
  }

  public newGame(): void {
    this.boardComposite = this.chessFactory.createInitialBoard()
    DOMGenerator.getInstance().refreshBoard(this.boardComposite)
  }

  public async loadGame(): Promise<void> {
    const response = await Axios.get(API.LOAD_URL)
    this.boardComposite = this.chessFactory.createBoardFromJSON(response.data)
    DOMGenerator.getInstance().refreshBoard(this.boardComposite)
  }

  public async saveGame(): Promise<void> {
    this.boardComposite.cleanCircularReferences()
    const content = JSON.stringify(this.boardComposite.getJSON())
    const config = { headers: { 'Content-Type': 'application/json' } }
    const data = { json: content }
    await Axios.post(API.SAVE_URL, data, config)
    alert('Jogo salvo')
  }
}
