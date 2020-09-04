import _ from 'lodash'
import { BoardComposite, BoardItemComposite, Composite } from './composite'
import { DOMGenerator } from './DOMGenerator'
import { BoardAttributes, BoardItemAttributes, Model, PieceAttributes } from './models'

export class ChessEngine {
  private currentMovingPiece: Model<PieceAttributes>

  public setCurrentMovingPiece(piece: Model<PieceAttributes> | null): void {
    if (this.currentMovingPiece && !_.isEqual(this.currentMovingPiece, piece)) {
      if (!piece) return this.removeHighLightFromPieceBoard(this.currentMovingPiece)
      this.removeHighLightFromPieceBoard(piece)
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

  public removeItemHighlight(item: Composite<BoardItemAttributes>): void {
    item.getModel().set('isHighlighted', false)
    DOMGenerator.getInstance().refreshItem(item)
    this.removeHighlightFromBoard(item.getParent() as Composite<BoardAttributes>)
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
      })
    }
  }

  private removeHighlightFromBoard(board: Composite<BoardAttributes>): void {
    const allItems = board.getChildren()
    allItems.forEach((item: Composite<BoardItemAttributes>) => {
      item.getModel().set('isHighlighted', false)
      DOMGenerator.getInstance().refreshItem(item)
    })
  }

  private removeHighLightFromPieceBoard(piece: Model<PieceAttributes>): void {
    const board = piece.get('boardItem').get('board')
    this.removeHighlightFromBoard(new BoardComposite(board, this))
  }
}
