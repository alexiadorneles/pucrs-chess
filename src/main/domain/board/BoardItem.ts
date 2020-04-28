import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { Piece } from '../piece/Piece'
import { Board } from './Board'

export class BoardItem {
  private piece: Piece
  private isHighlighted: boolean
  private element: Element
  private board: Board
  constructor(private position: Position, private color: Color) {}

  public addPiece(piece: Piece): void {
    this.piece = piece
    if (piece) {
      this.piece.addToItem(this)
    }
  }

  public setElement(element: Element): void {
    this.element = element
  }

  public addToBoard(board: Board): void {
    this.board = board
  }

  public setBoard(board: Board): void {
    this.board = board
  }

  public onClick = () => {
    if (!this.isHighlighted) {
      if (this.piece) {
        this.board.setPecaEmMovimento(this.piece)
        this.setHighlight(true)
      }
    } else {
      if (!this.piece) {
        if (this.board.isMovingPiece()) {
          this.board.movePiece(this)
        }
      } else {
        if (this.board.isMovingPiece()) {
          if (!_.isEqual(this.piece, this.board.currentMovingPieces)) {
            this.board.movePiece(this)
          }
        }
        this.setHighlight(false)
      }
    }
  }

  public getColor(): Color {
    return this.color
  }

  public getPiece(): Piece {
    return this.piece
  }

  public getPosition(): Position {
    return this.position
  }

  public getBoard(): Board {
    return this.board
  }

  public setHighlight(isDestacado: boolean): void {
    this.isHighlighted = isDestacado
    this.updateStyles()
    if (this.isHighlighted) {
      if (_.isEqual(this.piece, this.board.currentMovingPieces)) {
        this.simulateMovement()
      }
    } else {
      this.removeHighlightFromBoard()
    }
  }

  public removeHighlight(): void {
    this.isHighlighted = false
    this.updateStyles()
  }

  private removeHighlightFromBoard(): void {
    this.board.clearHighlights()
  }

  private simulateMovement(): void {
    if (this.piece) {
      const positions = this.piece.simulateMovement()
      this.board.highlightPositions(positions)
    }
  }

  private updateStyles(): void {
    let styleClass = this.element.getAttribute('class')
    const alreadyHighlighted = styleClass.includes('destaque')
    if (alreadyHighlighted && !this.isHighlighted) styleClass = styleClass.replace('destaque', '')
    const highlightClass = this.isHighlighted && !alreadyHighlighted ? 'destaque' : ''
    this.element.setAttribute('class', `${styleClass} ${highlightClass}`)
  }
}
