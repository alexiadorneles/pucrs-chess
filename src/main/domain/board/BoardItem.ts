import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { Piece } from '../piece/Piece'
import { Board } from './Board'
import { Model, ControlAttribute } from '../../definitions/Model'

export interface BoardItemAttributes extends ControlAttribute<BoardItem> {
  piece: Piece
  isHighlighted: boolean
  element: Element
  board: Board
  color: Color
  position: Position
}

export class BoardItem extends Model<BoardItemAttributes> {
  constructor(position: Position, color: Color) {
    super()
    this.set('color', color)
    this.set('position', position)
  }
}
