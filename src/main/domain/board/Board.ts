import _ from 'lodash'
import { BoardComposite } from '../../composite/BoardComposite'
import { WhitePiecesPositionMap } from '../../constants/InitialPositions'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { DOMGenerator } from '../../DOMGenerator'
import { ColorAdapter } from '../adapter/ColorAdapter'
import { Piece } from '../piece/Piece'
import { PieceBuilder } from '../PieceBuilder'
import { BoardItem } from './BoardItem'

const initMatrix = (): BoardItem[][] => {
  const matrix = []
  matrix[0] = []
  matrix[1] = []
  matrix[2] = []
  matrix[3] = []
  matrix[4] = []
  matrix[5] = []
  matrix[6] = []
  matrix[7] = []
  return matrix
}

export class Board {
  public matrix: Array<Array<BoardItem>> = initMatrix()
  public currentMovingPieces: Piece

  public init(): void {
    const whites = this.buildPieces(Color.WHITE)
    const pinks = this.buildPieces(Color.DARK_PINK)
    const empties = this.buildEmptyPieces()
    whites
      .concat(pinks)
      .concat(empties)
      .forEach(this.addItem)
  }

  public getAllItems(): BoardItem[] {
    return _.flatten(this.matrix)
  }

  public getItem({ line, column }: Position): BoardItem | null {
    const positionExists = this.isPositionInMatrixRange({ line: line, column: column })
    return positionExists ? this.matrix[line][column] : null
  }

  public highlightPositions(positions: Position[]): void {
    positions.forEach(position => this.getItem(position).setHighlight(true))
  }

  public clearHighlights(): void {
    this.executeForAll((item: BoardItem) => item.removeHighlight())
  }

  public isPositionBlockedByOpponent(position: Position, initialPosition: Position): boolean {
    const blockingPiece =
      this.isPositionInMatrixRange(position) && this.getPieceByPosition(position)
    const blockingColor = blockingPiece && this.getPieceByPosition(position).getColor()
    const blockedColor = this.getItem(initialPosition)
      .getPiece()
      .getColor()
    return blockingColor && blockedColor !== blockingColor
  }

  public setCurrentMovingPiece(piece: Piece): void {
    if (this.currentMovingPieces && !_.isEqual(this.currentMovingPieces, piece)) {
      this.clearHighlights()
    }
    this.currentMovingPieces = piece
  }

  public isMovingPiece(): boolean {
    return !!this.currentMovingPieces
  }

  public movePiece(clickedItem: BoardItem): void {
    const pieceItem = this.currentMovingPieces.getBoardItem()
    clickedItem.setPiece(this.currentMovingPieces)
    this.currentMovingPieces = null
    pieceItem.setPiece(null)
    DOMGenerator.getInstance().refresh(new BoardComposite(this))
  }

  public executeForAll(callback: (item: BoardItem, position?: Position) => void): void {
    for (let line = 0; line < 8; line++)
      for (let column = 0; column < 8; column++)
        callback(this.getItem({ line: line, column: column }), { line: line, column: column })
  }

  public isValidPosition = (position: Position): boolean => {
    return this.isPositionInMatrixRange(position) && !this.getPieceByPosition(position)
  }

  public isPositionInMatrixRange(position: Position): boolean {
    return position.column < 8 && position.column >= 0 && position.line >= 0 && position.line < 8
  }

  public getPieceByPosition(position: Position): Piece | null {
    return this.isPositionInMatrixRange(position) ? this.getItem(position).getPiece() : null
  }

  public addItem = (item: BoardItem) => {
    const { line: line, column: column } = item.getPosition()
    this.matrix[line][column] = item
    item.addToBoard(this)
  }

  private buildPieces(color: Color): BoardItem[] {
    return Object.values(PieceKind)
      .filter(Boolean)
      .reduce(
        (agg: BoardItem[], kind: PieceKind) => agg.concat(PieceBuilder.build(kind, color)),
        [],
      )
  }

  private buildEmptyPieces(): BoardItem[] {
    return WhitePiecesPositionMap.get(PieceKind.EMPTY).map(
      position => new BoardItem(position, ColorAdapter.defineItemColor(position)),
    )
  }
}
