import _ from 'lodash'
import { Composite, BaseComposite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Board, BoardAttributes } from '../domain/board/Board'
import { BoardItemComposite } from './BoardItemComposite'
import { Model } from '../definitions/Model'
import { ChessEngine } from '../ChessEngine'
export class BoardComposite implements Composite<BoardAttributes> {
  constructor(private board: Board, private engine: ChessEngine) {
    this.board.init()
  }

  public getModel(): Model<BoardAttributes> {
    return this.board
  }

  public getParent(): Composite<any> {
    throw new Error('Board is the root of the tree.')
  }

  public static createFromJSON(
    object: JSONObject,
    engine: ChessEngine,
  ): Composite<BoardAttributes> {
    const board = Object.assign(new Board(), object)
    const composite = new BoardComposite(board, engine)
    const items = board
      .getAllItems()
      .map(item => BoardItemComposite.createFromJSON(item, composite, engine))
    return composite
  }

  public createElement(): Element {
    return document.createElement('div')
  }

  getChildren(): BaseComposite[] {
    const items = this.board.getAllItems()
    return items.map(item => new BoardItemComposite(item, this, this.engine))
  }

  public getJSON(): JSONObject {
    return this.board
  }

  cleanCircularReferences(): void {
    this.getChildren().forEach(child => child.cleanCircularReferences())
  }
}
