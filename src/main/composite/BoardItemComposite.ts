import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { BoardItem } from '../domain/board/BoardItem'
import { PieceComposite } from './PieceComposite'
export class BoardItemComposite implements Composite {
  constructor(private boardItem: BoardItem) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
  }
  public createElement(): Element {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')
    const square = document.createElement('span')
    square.setAttribute('class', `fas fa-square-full chess-square ${this.boardItem.getColor()}`)
    square.addEventListener('click', this.boardItem.onClick)
    this.boardItem.setElement(square)
    const [piece] = this.getChildren()
    if (piece) {
      const pieceElement = piece.createElement()
      pieceElement.addEventListener('click', this.boardItem.onClick)
      div.appendChild(square)
      div.appendChild(pieceElement)
    } else {
      div.appendChild(square)
    }
    return div
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

  public cleanCircularReferences(): void {
    this.boardItem.setBoard(null)
    const children = this.getChildren()
    children.forEach(children => children.cleanCircularReferences())
  }
}
