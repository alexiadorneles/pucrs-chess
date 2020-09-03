import _ from 'lodash'
import { WhitePiecesPositionMap } from '../../constants/InitialPositions'
import { Color } from '../../definitions/Color'
import { ControlAttribute, Model } from '../../definitions/Model'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { ColorAdapter } from '../adapter/ColorAdapter'
import { Piece, PieceAttributes } from '../piece/Piece'
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

export interface BoardAttributes extends ControlAttribute<Board> {
  currentMovingPieces: Model<PieceAttributes>
}

export class Board extends Model<BoardAttributes> {
  public matrix: Array<Array<BoardItem>> = initMatrix()

  constructor() {
    super()
    this.init()
  }

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

  public isPositionBlockedByOpponent(position: Position, initialPosition: Position): boolean {
    const blockingPiece =
      this.isPositionInMatrixRange(position) && this.getPieceByPosition(position)
    const blockingColor = blockingPiece && this.getPieceByPosition(position).get('color')
    const blockedColor = this.getItem(initialPosition)
      .get('piece')
      .get('color')
    return blockingColor && blockedColor !== blockingColor
  }

  public isValidPosition = (position: Position): boolean => {
    return this.isPositionInMatrixRange(position) && !this.getPieceByPosition(position)
  }

  public isPositionInMatrixRange(position: Position): boolean {
    return position.column < 8 && position.column >= 0 && position.line >= 0 && position.line < 8
  }

  public getPieceByPosition(position: Position): Piece | null {
    return this.isPositionInMatrixRange(position) ? this.getItem(position).get('piece') : null
  }

  public addItem = (item: BoardItem) => {
    const { line: line, column: column } = item.get('position')
    this.matrix[line][column] = item
    item.set('board', this)
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
