import { Composite } from './definitions/Composite'
import _ from 'lodash'
import { BoardAttributes } from './domain/board/Board'
import { BoardItemAttributes } from './domain/board/BoardItem'
import { ReactiveComposite } from './definitions/ReactiveItem'

export class DOMGenerator {
  private static instance: DOMGenerator

  private constructor() {}

  static getInstance(): DOMGenerator {
    if (!DOMGenerator.instance) {
      DOMGenerator.instance = new DOMGenerator()
    }

    return DOMGenerator.instance
  }

  public refresh(boardComposite: Composite<BoardAttributes>): void {
    const root = document.getElementById('root')
    root.innerHTML = ''
    const board = boardComposite.createElement()
    const itemCompositeMatrix = _.chunk(boardComposite.getChildren(), 8) as ReactiveComposite<
      BoardItemAttributes
    >[][]
    const lines = this.getBoardLines(itemCompositeMatrix)
    lines.forEach(line => board.appendChild(line))
    root.appendChild(board)
  }

  private getBoardLines(items: ReactiveComposite<BoardItemAttributes>[][]): Element[] {
    const columns = items.map(composites => composites.map(item => this.getItemWithPiece(item)))
    return columns.map(column => {
      const lineElement = document.createElement('div')
      lineElement.setAttribute('class', 'chess-line')
      column.forEach(element => lineElement.appendChild(element))
      return lineElement
    })
  }

  private getItemWithPiece(boardItem: ReactiveComposite<BoardItemAttributes>): Element {
    const itemElement = boardItem.createElement()
    const [piece] = boardItem.getChildren()
    if (piece) {
      const pieceElement = piece.createElement()
      // TODO: FIX
      pieceElement.addEventListener('click', boardItem.onClick)
      itemElement.appendChild(pieceElement)
    }
    return itemElement
  }
}
