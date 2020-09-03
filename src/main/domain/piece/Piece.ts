import _ from 'lodash'
import { Board } from 'main/domain/board/Board'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { BoardItem, BoardItemAttributes } from '../board/BoardItem'
import { Movement } from '../movement/Movement'
import { PieceBuilderMap } from '../PieceBuilder'
import { Model, ControlAttribute } from '../../definitions/Model'

export interface PieceAttributes extends ControlAttribute<Piece> {
  boardItem: Model<BoardItemAttributes>
  kind: PieceKind
  movements: Movement[]
  color: Color
  isAllowedToGoBackwards: boolean
}

export abstract class Piece extends Model<PieceAttributes> {
  protected boardItem: BoardItem

  constructor(
    protected kind: PieceKind,
    protected color: Color,
    protected movements: Movement[],
    protected isAllowedToGoBackwards: boolean,
  ) {
    super()
  }

  public getBoardItem(): BoardItem {
    return this.boardItem
  }

  public getBoard(): Board {
    return this.boardItem.get('board')
  }

  public simulateMovement(): Position[] {
    const currentPosition = this.getBoardItem().get('position')
    const positions = this.movements.map(movement =>
      movement.executeSimulation(currentPosition, this.getBoard()),
    )
    return _.flatten(positions)
  }

  public addToItem(item: BoardItem): void {
    this.boardItem = item
  }
}
