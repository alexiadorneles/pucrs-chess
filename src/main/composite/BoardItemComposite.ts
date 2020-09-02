import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { BoardItem } from '../domain/board/BoardItem'
import { PieceComposite } from './PieceComposite'
export class BoardItemComposite implements Composite {
  constructor(private boardItem: BoardItem) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
  }

  public createElement(): Element {
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    const square = document.createElement('span')
    square.setAttribute('class', `fas fa-square-full chess-square ${this.boardItem.getColor()}`)
    square.addEventListener('click', this.boardItem.onClick)
    container.append(square)
    this.boardItem.setElement(square)
    return container
  }

  public static createFromJSON(object: JSONObject): Composite {
    const boardItem = Object.assign(new BoardItem(object.position, object.color), object)
    const piece = boardItem.getPiece()
    piece && PieceComposite.createFromJSON(piece)
    return new BoardItemComposite(boardItem)
  }

  getChildren(): Composite[] {
    const piece = this.boardItem.getPiece()
    return piece ? [new PieceComposite(piece)] : []
  }
  setChildren(children: Composite[]): void {}

  public getJSON(): JSONObject {
    return this.boardItem
  }

  public cleanCircularReferences(): void {
    this.boardItem.setBoard(null)
    const children = this.getChildren()
    children.forEach(children => children.cleanCircularReferences())
  }
}
