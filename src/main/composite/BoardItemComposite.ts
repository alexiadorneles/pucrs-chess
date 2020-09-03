import _ from 'lodash'
import { ChessEngine } from '../ChessEngine'
import { JSONObject } from '../definitions/JSONObject'
import { ReactiveComposite } from '../definitions/ReactiveItem'
import { BoardAttributes, BoardItem, BoardItemAttributes, Model, PieceAttributes } from '../models'
import { BaseComposite, Composite } from './Composite'
import { PieceComposite } from './PieceComposite'

export class BoardItemComposite implements ReactiveComposite<BoardItemAttributes> {
  constructor(
    private model: BoardItem,
    private parent: Composite<BoardAttributes>,
    private engine: ChessEngine,
  ) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
    this.onClick = this.onClick.bind(this)
    this.model.set('board', parent.getModel().get('control'))
    this.model.set('control', model)
  }

  public getModel(): Model<BoardItemAttributes> {
    return this.model
  }

  public getParent(): Composite<BoardAttributes> {
    return this.parent
  }

  public onClick(event: Event): void {
    const [piece] = this.getChildren() as Composite<PieceAttributes>[]
    const boardModel = this.getParent().getModel()
    if (!this.model.get('isHighlighted')) {
      if (piece) {
        this.engine.setCurrentMovingPiece(piece.getModel())
        this.engine.highlightItem(this)
      }
    } else {
      if (!piece) {
        if (this.engine.getCurrentMovingPiece()) {
          this.engine.movePiece(this.getParent(), this)
        }
      } else {
        if (this.engine.getCurrentMovingPiece()) {
          if (!_.isEqual(piece, this.engine.getCurrentMovingPiece())) {
            this.engine.movePiece(this.getParent(), this)
          }
        }
        this.engine.removeItemHighlight(this)
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
