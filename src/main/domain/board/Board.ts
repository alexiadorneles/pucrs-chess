import axios from 'axios'
import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { WhitePiecesPositionMap } from '../../definitions/InitialPositions'
import { PieceKind } from '../../definitions/PieceKind'
import { DOMGenerator } from '../../DOMGenerator'
import { ColorAdapter } from '../ColorAdapter'
import { PieceBuilder } from '../PieceBuilder'
import { BoardItem } from './BoardItem'
import { Piece } from '../piece/Piece'
import { API } from '../../config'

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

  public initBoard = (): Board => {
    const whites = this.buildPieces(Color.WHITE)
    const pinks = this.buildPieces(Color.DARK_PINK)
    const empties = this.buildEmptyPieces()
    whites
      .concat(pinks)
      .concat(empties)
      .forEach(this.addItem)
    return this
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

  public save = async (): Promise<void> => {
    this.executeForAll((item: BoardItem) => {
      item.setBoard(null)
      if (item.getPiece()) {
        item.getPiece().addToItem(null)
      }
    })
    const content = JSON.stringify(this)
    const config = { headers: { 'Content-Type': 'application/json' } }
    const data = { json: content }
    await axios.post(API.SAVE_URL, data, config)
  }

  public isPositionBlockedByOpponent(position: Position, initialPosition: Position): boolean {
    const blockingPiece =
      this.isPositionInMatrixRange(position) && this.getPieceByPosition(position)
    const blockingColor = blockingPiece && this.getPieceByPosition(position).getCor()
    const blockedColor = this.getItem(initialPosition)
      .getPiece()
      .getCor()
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
    clickedItem.addPiece(this.currentMovingPieces)
    this.currentMovingPieces = null
    pieceItem.addPiece(null)
    DOMGenerator.getInstance().refresh()
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
