import { Board } from './domain/board/Board'
import { BoardItem } from './domain/board/BoardItem'
import { Piece } from './domain/piece/Piece'

export class DOMGenerator {
  private static instance: DOMGenerator
  private board: Board

  private constructor() {}

  public injectBoard(board: Board): void {
    this.board = board
  }

  public getBoard(): Board {
    return this.board
  }

  static getInstance(): DOMGenerator {
    if (!DOMGenerator.instance) {
      DOMGenerator.instance = new DOMGenerator()
    }

    return DOMGenerator.instance
  }

  public refresh(): any {
    const root = document.getElementById('root')
    root.innerHTML = ''
    const lines = 8
    const columns = 8
    const lineElements = []
    let columnElements = []
    for (let line = 0; line < lines; line++) {
      columnElements = []

      for (let column = 0; column < columns; column++) {
        const item = this.board.getItem({ line: line, column: column })
        const element = this.createElement(item)
        columnElements.push(element)
      }

      const lineElement = document.createElement('div')
      lineElement.setAttribute('class', 'chess-line')
      columnElements.forEach(columnElement => lineElement.appendChild(columnElement))
      lineElements.push(lineElement)
    }

    lineElements.forEach(element => root.appendChild(element))
  }

  private createElement(item: BoardItem): Element {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')

    const square = document.createElement('span')
    square.setAttribute('class', `fas fa-square-full chess-square ${item.getColor()}`)
    square.addEventListener('click', item.onClick)
    item.setElement(square)

    const pieceIcon = this.createPieceIcon(item.getPiece())
    pieceIcon.addEventListener('click', item.onClick)

    div.appendChild(pieceIcon)
    div.appendChild(square)

    return div
  }

  private createPieceIcon(piece: Piece | undefined): Element {
    const pieceType = (piece && piece.getKind()) || ''
    const pieceColor = (piece && piece.getCor()) || ''
    const pieceIcon = document.createElement('i')
    pieceIcon.setAttribute('class', `fas fa-${pieceType} piece ${pieceColor}`)
    return pieceIcon
  }
}
