import { ChessEngine } from '../ChessEngine'
import { JSONObject } from '../definitions/JSONObject'
import { PieceBuilderMap } from '../factory'
import { BoardItemAttributes, Model, Movement, Piece, PieceAttributes } from '../models'
import { BaseComposite, Composite } from './Composite'
import { MovementComposite } from './MovementComposite'

export class PieceComposite implements Composite<PieceAttributes> {
  constructor(
    private piece: Piece,
    private parent: Composite<BoardItemAttributes>,
    private engine: ChessEngine,
  ) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
    this.piece.set('boardItem', parent.getModel())
    this.piece.set('control', piece)
  }

  public getModel(): Model<PieceAttributes> {
    return this.piece
  }

  public getParent(): Composite<BoardItemAttributes> {
    return this.parent
  }

  public createElement(): Element {
    const pieceType = (this.piece && this.piece.get('kind')) || ''
    const pieceColor = (this.piece && this.piece.get('color')) || ''
    const pieceIcon = document.createElement('i')
    pieceIcon.setAttribute('class', `fas fa-${pieceType} piece ${pieceColor}`)
    return pieceIcon
  }

  public static createFromJSON(
    object: JSONObject,
    parent: Composite<BoardItemAttributes>,
    engine: ChessEngine,
  ): Composite<PieceAttributes> {
    if (!object) return
    const instantiationFn = PieceBuilderMap.get(object.kind)
    const piece = Object.assign(new instantiationFn(object.color), object) as Piece
    const mapMovements = (mov: Movement) =>
      MovementComposite.createFromJSON(mov, this as any)
        .getModel()
        .get('control')
    piece.set(
      'movements',
      piece.get('movements').map((mov: Movement) =>
        MovementComposite.createFromJSON(mov, this as any)
          .getModel()
          .get('control'),
      ),
    )
    return new PieceComposite(piece, parent, engine)
  }

  getChildren(): BaseComposite[] {
    return this.piece.get('movements').map(movement => new MovementComposite(movement, this))
  }

  public getJSON(): JSONObject {
    return this.piece
  }

  cleanCircularReferences(): void {
    this.piece.set('boardItem', null)
  }
}
