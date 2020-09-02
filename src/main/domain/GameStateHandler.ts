import { ChessFactory } from '../factory/ChessFactory'
import { DOMGenerator } from '../DOMGenerator'
import { Board } from './board/Board'
import Axios from 'axios'
import { API } from '../constants/config'
import { BoardComposite } from '../composite/BoardComposite'
import { Composite } from '../definitions/Composite'

export class GameStateHandler {
  private boardComposite: Composite
  constructor(private chessFactory: ChessFactory, private domGenerator: DOMGenerator) {
    this.newGame = this.newGame.bind(this)
    this.loadGame = this.loadGame.bind(this)
    this.saveGame = this.saveGame.bind(this)
  }

  public newGame(): void {
    this.boardComposite = this.chessFactory.createInitialBoard()
    this.domGenerator.refresh(this.boardComposite)
  }

  public async loadGame(): Promise<void> {
    const response = await Axios.get(API.LOAD_URL)
    this.boardComposite = this.chessFactory.createBoardFromJSON(response.data)
    this.domGenerator.refresh(this.boardComposite)
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
