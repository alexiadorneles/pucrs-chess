import { Composite } from './definitions/Composite'
import { BoardAttributes, Board } from './domain/board/Board'
import { BoardItemAttributes, BoardItem } from './domain/board/BoardItem'
import { DOMGenerator } from './DOMGenerator'
import _ from 'lodash'
import { BoardComposite } from './composite/BoardComposite'
import { BoardItemComposite } from './composite/BoardItemComposite'
import { Model } from './definitions/Model'
import { PieceAttributes } from './domain/piece/Piece'

export class ChessEngine {
  private currentMovingPiece: Model<PieceAttributes>

  public setCurrentMovingPiece(piece: Model<PieceAttributes> | null): void {
    if (this.currentMovingPiece && !_.isEqual(this.currentMovingPiece, piece)) {
      if (!piece) {
        const board = this.currentMovingPiece.get('boardItem').get('board')
        return this.removeHighlightFromBoard(new BoardComposite(board, this))
      }
      const board = piece.get('boardItem').get('board')
      this.removeHighlightFromBoard(new BoardComposite(board, this))
    }
    this.currentMovingPiece = piece
  }

  public getCurrentMovingPiece(): Model<PieceAttributes> {
    return this.currentMovingPiece
  }

  public movePiece(board: Composite<BoardAttributes>, item: Composite<BoardItemAttributes>): void {
    const clickedItem = item.getModel().get('control')
    const pieceItem = this.currentMovingPiece.get('boardItem')
    clickedItem.set('piece', this.currentMovingPiece.get('control'))
    this.setCurrentMovingPiece(null)
    pieceItem.set('piece', null)
    DOMGenerator.getInstance().refreshBoard(board)
  }

  public highlightItem(item: Composite<BoardItemAttributes>): void {
    const model = item.getModel()
    const board = item.getParent() as Composite<BoardAttributes>

    model.set('isHighlighted', true)
    DOMGenerator.getInstance().refreshItem(item)

    const clickedItemIsBeingMoved = () => _.isEqual(model.get('piece'), this.currentMovingPiece)

    return clickedItemIsBeingMoved()
      ? this.simulateMovementForItem(item)
      : this.removeHighlightFromBoard(board)
  }

  private simulateMovementForItem(itemComposite: Composite<BoardItemAttributes>): void {
    const board = itemComposite.getParent() as Composite<BoardAttributes>
    const boardControl = board.getModel().get('control')
    const piece = itemComposite.getModel().get('piece')
    if (piece) {
      const positions = piece.simulateMovement()
      positions.forEach(position => {
        const item = boardControl.getItem(position)
        item.set('isHighlighted', true)
        DOMGenerator.getInstance().refreshItem(new BoardItemComposite(item, board, this))
        // this.highlightItem(new BoardItemComposite(item, board, this))
      })
    }
  }

  public removeItemHighlight(item: Composite<BoardItemAttributes>): void {
    item.getModel().set('isHighlighted', false)
    DOMGenerator.getInstance().refreshItem(item)
    this.removeHighlightFromBoard(item.getParent() as Composite<BoardAttributes>)
  }

  removeHighlightFromBoard(board: Composite<BoardAttributes>): void {
    const allItems = board.getChildren()
    allItems.forEach((item: Composite<BoardItemAttributes>) => {
      item.getModel().set('isHighlighted', false)
      DOMGenerator.getInstance().refreshItem(item)
    })
  }
}
