import _ from 'lodash'
import { BaseComposite, Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Model } from '../definitions/Model'
import { ReactiveComposite } from '../definitions/ReactiveItem'
import { BoardAttributes, Board } from '../domain/board/Board'
import { BoardItem, BoardItemAttributes } from '../domain/board/BoardItem'
import { PieceAttributes } from '../domain/piece/Piece'
import { PieceComposite } from './PieceComposite'
import { ChessEngine } from '../ChessEngine'

export class BoardItemComposite implements ReactiveComposite<BoardItemAttributes> {
  constructor(
    private model: BoardItem,
    private parent: Composite<BoardAttributes>,
    private engine: ChessEngine,
  ) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  public getModel(): Model<BoardItemAttributes> {
    return this.model
  }

  public getParent(): Composite<BoardAttributes> {
    return this.parent
  }

  public onClick(element: Event): void {
    const [piece] = this.getChildren() as Composite<PieceAttributes>[]
    const boardModel = this.getParent().getModel()
    if (!this.model.get('isHighlighted')) {
      if (piece) {
        boardModel.set('currentMovingPieces', piece.getModel())
        this.model.setHighlight(true)
      }
    } else {
      if (!piece) {
        if (boardModel.get('currentMovingPieces')) {
          ;(this.getParent() as any).board.movePiece(this.model)
        }
      } else {
        if (boardModel.get('currentMovingPieces')) {
          if (!_.isEqual(piece, boardModel.get('currentMovingPieces'))) {
            ;(this.getParent() as any).board.movePiece(this.model)
          }
        }
        this.model.setHighlight(false)
      }
    }
  }

  public createElement(): Element {
    const container = document.createElement('div')
    container.setAttribute('class', 'container')
    const square = document.createElement('span')
    square.setAttribute('class', `fas fa-square-full chess-square ${this.model.get('color')}`)
    square.addEventListener('click', this.onClick)
    container.append(square)
    this.model.set('element', square)
    return container
  }

  public static createFromJSON(
    object: JSONObject,
    parent: Composite<BoardAttributes>,
    engine: ChessEngine,
  ): Composite<BoardItemAttributes> {
    const boardItem = Object.assign(new BoardItem(object.position, object.color), object)
    const piece = boardItem.getPiece()
    const composite = new BoardItemComposite(boardItem, parent, engine)
    piece && PieceComposite.createFromJSON(piece, composite, engine)
    return composite
  }

  getChildren(): BaseComposite[] {
    const piece = this.model.get('piece')
    return piece ? [new PieceComposite(piece, this, this.engine)] : []
  }

  public getJSON(): JSONObject {
    return this.model
  }

  public cleanCircularReferences(): void {
    this.model.set('board', null)
    const children = this.getChildren()
    children.forEach(children => children.cleanCircularReferences())
  }
}
