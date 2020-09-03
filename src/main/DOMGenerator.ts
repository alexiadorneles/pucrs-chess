import _ from 'lodash'
import { Composite } from './composite'
import { ReactiveComposite } from './definitions/ReactiveItem'
import { BoardAttributes, BoardItemAttributes } from './models'

export class DOMGenerator {
  private static instance: DOMGenerator

  private constructor() {}

  static getInstance(): DOMGenerator {
    if (!DOMGenerator.instance) {
      DOMGenerator.instance = new DOMGenerator()
    }

    return DOMGenerator.instance
  }

  public refreshItem(itemComposite: Composite<BoardItemAttributes>): void {
    const element = itemComposite.getModel().get('element')
    if (!element) return
    let styleClass = element.getAttribute('class')
    const alreadyHighlighted = styleClass.includes('highlight')
    if (this.shouldRemoveHighlight(alreadyHighlighted, itemComposite))
      styleClass = styleClass.replace('highlight', '')
    const highlightClass =
      itemComposite.getModel().get('isHighlighted') && !alreadyHighlighted ? 'highlight' : ''
    element.setAttribute('class', `${styleClass} ${highlightClass}`)
  }

  public refreshBoard(boardComposite: Composite<BoardAttributes>): void {
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

  private shouldRemoveHighlight(
    alreadyHighlighted: boolean,
    itemComposite: Composite<BoardItemAttributes>,
  ): boolean {
    return alreadyHighlighted && !itemComposite.getModel().get('isHighlighted')
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
      pieceElement.addEventListener('click', boardItem.onClick)
      itemElement.appendChild(pieceElement)
    }
    return itemElement
  }
}
