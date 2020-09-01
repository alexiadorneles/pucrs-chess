import { Board } from '../domain/board/Board'
import _ from 'lodash'
import { Composite } from '../definitions/Composite'
import { ReplicationAdapterFactory } from '../domain/adapter/ReplicableObjectAdapter'
import { BoardItemComposite } from './BoardItemComposite'
export class BoardComposite implements Composite {
  constructor(private board: Board, private replicationFactory: ReplicationAdapterFactory) {
    if (!(this.board instanceof Board)) {
      this.board = this.replicationFactory.createBoardReplicationAdapter().replicate(board)
    }
    this.board.init()
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

  public clone(): Composite {
    const replicationAdapter = this.replicationFactory.createBoardReplicationAdapter()
    const board = replicationAdapter.replicate(this.board)
    const composite = new BoardComposite(board, this.replicationFactory)
    composite.getChildren()
    return composite
  }

  getChildren(): Composite[] {
    const items = this.board.getAllItems()
    return items.map(item => new BoardItemComposite(item, this.replicationFactory))
  }

  setChildren(children: Composite[]): void {
    // this.board.setItems(children)
  }

  cleanCircularReferences(): void {
    this.getChildren().forEach(child => child.cleanCircularReferences())
  }
}
