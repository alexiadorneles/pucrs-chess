import { Board } from './domain/board/Board'
import { BoardItem } from './domain/board/BoardItem'
import { Piece } from './domain/piece/Piece'
import { Composite } from './definitions/Composite'

export class DOMGenerator {
  private static instance: DOMGenerator
  private board: Composite

  private constructor() {}

  public injectBoard(board: Composite): void {
    this.board = board
  }

  public getBoard(): Composite {
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
    const board = this.board.createElement()
    root.appendChild(board)
    // const lineElements: Element[] = []
    // let columnElements: Element[] = []
    // const items = this.board.getChildren()
    // items.forEach((item, index) => {
    //   const element = item.createElement()
    //   const pieceElement = item.getChildren()[0].createElement()
    //   element.appendChild(pieceElement)
    //   columnElements.push(element)
    //   if (item.boardItem.position.column === 7) {
    //     const lineElement = document.createElement('div')
    //     lineElement.setAttribute('class', 'chess-line')
    //     columnElements.forEach(el => lineElement.appendChild(el))
    //     lineElements.push(lineElement)
    //     columnElements = []
    //   }
    // })
    // lineElements.forEach(element => root.appendChild(element))
    // for (let line = 0; line < lines; line++) {
    //   columnElements = []

    //   for (let column = 0; column < columns; column++) {
    //     const items = this.board.getChildren()
    //     const element = this.board.createElement()
    //     items.forEach(item => {
    //       const element = item.createElement()
    //       cons
    //     })
    // const item = this.board.getItem({ line: line, column: column })
    // const element = this.createElement(item)
    // columnElements.push(element)
  }

  //   const lineElement = document.createElement('div')
  //   lineElement.setAttribute('class', 'chess-line')
  //   columnElements.forEach(columnElement => lineElement.appendChild(columnElement))
  //   lineElements.push(lineElement)
  // }

  // lineElements.forEach(element => root.appendChild(element))
}

// private createElement(item: BoardItem): Element {
//   const div = document.createElement('div')
//   div.setAttribute('class', 'container')

//   const square = document.createElement('span')
//   square.setAttribute('class', `fas fa-square-full chess-square ${item.getColor()}`)
//   square.addEventListener('click', item.onClick)
//   item.setElement(square)

//   const pieceIcon = this.createPieceIcon(item.getPiece())
//   pieceIcon.addEventListener('click', item.onClick)

//   div.appendChild(pieceIcon)
//   div.appendChild(square)

//   return div
// }

// private createPieceIcon(piece: Piece | undefined): Element {
//   const pieceType = (piece && piece.getKind()) || ''
//   const pieceColor = (piece && piece.getColor()) || ''
//   const pieceIcon = document.createElement('i')
//   pieceIcon.setAttribute('class', `fas fa-${pieceType} piece ${pieceColor}`)
//   return pieceIcon
// }
// }
