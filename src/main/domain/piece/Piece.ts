import _ from 'lodash'
import { Tabuleiro } from 'main/domain/Tabuleiro'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Movement } from '../movement/Movement'

export abstract class Piece {
  protected boardItem: ItemTabuleiro
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

  public getMovements(): Movement[] {
    return this.movements
  }

  public setMovements(movements: Movement[]): void {
    this.movements = movements
  }

  public canGoBackwards(): boolean {
    return this.isAllowedToGoBackwards
  }

  public getBoardItem(): ItemTabuleiro {
    return this.boardItem
  }

  public getBoard(): Tabuleiro {
    return this.boardItem.getTabuleiro()
  }

  public simulateMovement(): Position[] {
    const currentPosition = this.getBoardItem().getPosicao()
    const positions = this.movements.map(movement =>
      movement.executeSimulation(currentPosition, this.getBoard()),
    )
    return _.flatten(positions)
  }

  public addToItem(item: ItemTabuleiro): void {
    this.boardItem = item
  }

  public getCor(): Color {
    return this.color
  }

  public getKind(): PieceKind {
    return this.kind
  }
}
