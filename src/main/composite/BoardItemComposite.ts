import { BoardItem } from '../domain/board/BoardItem'
import { Composite } from '../definitions/Composite'
import { ReplicationAdapterFactory } from '../domain/adapter/ReplicableObjectAdapter'
import { PieceComposite } from './PieceComposite'
export class BoardItemComposite implements Composite {
  constructor(private boardItem: BoardItem, private replicationFactory: ReplicationAdapterFactory) {
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
  public clone(): Composite {
    const replicationAdapter = this.replicationFactory.createItemReplicationAdapter()
    const item = replicationAdapter.replicate(this.boardItem)
    return new BoardItemComposite(item, this.replicationFactory)
  }
  getChildren(): Composite[] {
    const piece = this.boardItem.getPiece()
    return piece ? [new PieceComposite(piece, this.replicationFactory)] : []
  }
  setChildren(children: Composite[]): void {}

  public cleanCircularReferences(): void {
    this.boardItem.setBoard(null)
    const children = this.getChildren()
    children.forEach(children => children.cleanCircularReferences())
  }
}
