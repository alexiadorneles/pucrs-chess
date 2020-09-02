import { Composite } from './definitions/Composite'
import _ from 'lodash'

export class DOMGenerator {
  private static instance: DOMGenerator

  private constructor() {}

  static getInstance(): DOMGenerator {
    if (!DOMGenerator.instance) {
      DOMGenerator.instance = new DOMGenerator()
    }

    return DOMGenerator.instance
  }

  public refresh(boardComposite: Composite): void {
    const root = document.getElementById('root')
    root.innerHTML = ''
    const board = boardComposite.createElement()
    const itemCompositeMatrix = _.chunk(boardComposite.getChildren(), 8)
    const lines = this.getBoardLines(itemCompositeMatrix)
    lines.forEach(line => board.appendChild(line))
    root.appendChild(board)
  }

  private getBoardLines(items: Composite[][]): Element[] {
    const columns = items.map(composites => composites.map(item => this.getItemWithPiece(item)))
    return columns.map(column => {
      const lineElement = document.createElement('div')
      lineElement.setAttribute('class', 'chess-line')
      column.forEach(element => lineElement.appendChild(element))
      return lineElement
    })
  }

  private getItemWithPiece(boardItem: Composite): Element {
    const itemElement = boardItem.createElement()
    const [piece] = boardItem.getChildren()
    if (piece) {
      const pieceElement = piece.createElement()
      // TODO: FIX
      pieceElement.addEventListener('click', (boardItem as any).boardItem.onClick)
      itemElement.appendChild(pieceElement)
    }
    return itemElement
  }
}
