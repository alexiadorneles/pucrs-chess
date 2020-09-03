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

  public setHighlight(isHighlighted: boolean): void {
    this.set('isHighlighted', isHighlighted)
    this.updateStyles()
    if (isHighlighted) {
      if (_.isEqual(this.get('piece'), this.get('board').get('currentMovingPieces'))) {
        this.simulateMovement()
      }
    } else {
      this.removeHighlightFromBoard()
    }
  }

  public removeHighlight(): void {
    this.set('isHighlighted', false)
    this.updateStyles()
  }

  private removeHighlightFromBoard(): void {
    this.get('board')
      .get('control')
      .clearHighlights()
  }

  private simulateMovement(): void {
    if (this.get('piece')) {
      const positions = this.get('piece').simulateMovement()
      this.get('board')
        .get('control')
        .highlightPositions(positions)
    }
  }

  private updateStyles(): void {
    let styleClass = this.get('element').getAttribute('class')
    const alreadyHighlighted = styleClass.includes('highlight')
    if (alreadyHighlighted && !this.get('isHighlighted'))
      styleClass = styleClass.replace('highlight', '')
    const highlightClass = this.get('isHighlighted') && !alreadyHighlighted ? 'highlight' : ''
    this.get('element').setAttribute('class', `${styleClass} ${highlightClass}`)
  }
}
