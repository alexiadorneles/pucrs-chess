import _ from 'lodash'
import { Board } from 'main/domain/board/Board'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { BoardItem } from '../board/BoardItem'
import { Movement } from '../movement/Movement'
import { PieceBuilderMap } from '../PieceBuilder'

export abstract class Piece {
  protected boardItem: BoardItem
  protected kind: PieceKind
  protected movements: Movement[]
  protected color: Color
  protected isAllowedToGoBackwards: boolean

  constructor(
    kind: PieceKind,
    color: Color,
    movements: Movement[],
    isAllowedToGoBackwards: boolean,
  ) {
    this.kind = kind
    this.color = color
    this.movements = movements
    this.isAllowedToGoBackwards = isAllowedToGoBackwards
  }

  static copy(piece: Piece): Piece {
    const instantiationFn = PieceBuilderMap.get(piece.kind)
    const model = Object.assign(new instantiationFn(piece.color), piece)
    const movements = model.getMovements().map(mov => Movement.copy(mov))
    model.movements = movements
    return model
  }

  public getMovements(): Movement[] {
    return this.movements
  }

  public setMovements(movements: Movement[]): void {
    this.movements = movements
  }

  public canGoBackwards(): boolean {
    return this.isAllowedToGoBackwards
  }

  public getBoardItem(): BoardItem {
    return this.boardItem
  }

  public getBoard(): Board {
    return this.boardItem.getBoard()
  }

  public simulateMovement(): Position[] {
    const currentPosition = this.getBoardItem().getPosition()
    const positions = this.movements.map(movement =>
      movement.executeSimulation(currentPosition, this.getBoard()),
    )
    return _.flatten(positions)
  }

  public addToItem(item: BoardItem): void {
    this.boardItem = item
  }

  public getCor(): Color {
    return this.color
  }

  public getKind(): PieceKind {
    return this.kind
  }
}
