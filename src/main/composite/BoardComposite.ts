import _ from 'lodash'
import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Board } from '../domain/board/Board'
import { BoardItemComposite } from './BoardItemComposite'
export class BoardComposite implements Composite {
  constructor(private board: Board) {
    this.board.init()
  }

  public static createFromJSON(object: JSONObject): Composite {
    const board = Object.assign(new Board(), object)
    const items = board.getAllItems().map(item => BoardItemComposite.createFromJSON(item))
    return new BoardComposite(board)
  }

  public createElement(): Element {
    return document.createElement('div')
  }

  getChildren(): Composite[] {
    const items = this.board.getAllItems()
    return items.map(item => new BoardItemComposite(item))
  }

  public getJSON(): JSONObject {
    return this.board
  }

  setChildren(children: Composite[]): void {
    // this.board.setItems(children)
  }

  cleanCircularReferences(): void {
    this.getChildren().forEach(child => child.cleanCircularReferences())
  }
}
