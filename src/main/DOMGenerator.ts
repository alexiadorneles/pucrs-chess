import { Tabuleiro } from './domain/Tabuleiro'
import { ItemTabuleiro } from './domain/ItemTabuleiro'
import { Peca } from './domain/peca/Peca'

export class DOMGenerator {
  private static instance: DOMGenerator
  private board: Tabuleiro

  private constructor() {}

  public injectBoard(board: Tabuleiro): void {
    this.board = board
  }

  public getBoard(): Tabuleiro {
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
        const item = this.board.getItem({ linha: line, coluna: column })
        const element = this.createElement(item)
        columnElements.push(element)
      }

      const lineElement = document.createElement('div')
      lineElement.setAttribute('class', 'xadrez-linha')
      columnElements.forEach(columnElement => lineElement.appendChild(columnElement))
      lineElements.push(lineElement)
    }

    lineElements.forEach(element => root.appendChild(element))
  }

  private createElement(item: ItemTabuleiro): Element {
    const div = document.createElement('div')
    div.setAttribute('class', 'container')

    const square = document.createElement('span')
    square.setAttribute('class', `fas fa-square-full xadrez-quadrado ${item.getCor()}`)
    square.addEventListener('click', item.onClick)
    item.atribuirElemento(square)

    const pieceIcon = this.createPieceIcon(item.getPeca())
    pieceIcon.addEventListener('click', item.onClick)

    div.appendChild(pieceIcon)
    div.appendChild(square)

    return div
  }

  private createPieceIcon(piece: Peca | undefined): Element {
    const pieceType = (piece && piece.getTipo()) || ''
    const pieceColor = (piece && piece.getCor()) || ''
    const pieceIcon = document.createElement('i')
    pieceIcon.setAttribute('class', `fas fa-${pieceType} peca ${pieceColor}`)
    return pieceIcon
  }
}
