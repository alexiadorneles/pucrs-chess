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
    const board = document.createElement('div')
    const itemsMatrix = _.chunk(this.getChildren(), 8)
    const columns = itemsMatrix.map(item => item.map(boardItem => boardItem.createElement()))
    const lines = columns.map(column => {
      const lineElement = document.createElement('div')
      lineElement.setAttribute('class', 'chess-line')
      column.forEach(element => lineElement.appendChild(element))
      return lineElement
    })
    lines.forEach(line => board.appendChild(line))
    return board
  }

  getChildren(): Composite[] {
    const items = this.board.getAllItems()
    return items.map(item => new BoardItemComposite(item))
  }

  setChildren(children: Composite[]): void {
    // this.board.setItems(children)
  }

  cleanCircularReferences(): void {
    this.getChildren().forEach(child => child.cleanCircularReferences())
  }
}
