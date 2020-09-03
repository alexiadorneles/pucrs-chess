import { Composite, BaseComposite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Piece, PieceAttributes } from '../domain/piece/Piece'
import { PieceBuilderMap } from '../domain/PieceBuilder'
import { MovementComposite } from './MovementComposite'
import { BoardItemAttributes } from '../domain/board/BoardItem'
import { Model } from '../definitions/Model'
import { ChessEngine } from '../ChessEngine'
import { Movement } from '../domain/movement/Movement'

export class PieceComposite implements Composite<PieceAttributes> {
  constructor(
    private piece: Piece,
    private parent: Composite<BoardItemAttributes>,
    private engine: ChessEngine,
  ) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
    this.piece.set('boardItem', parent.getModel())
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
      MovementComposite.createFromJSON(mov, this as any, engine)
        .getModel()
        .get('control')
    piece.set(
      'movements',
      piece.get('movements').map((mov: Movement) =>
        MovementComposite.createFromJSON(mov, this as any, engine)
          .getModel()
          .get('control'),
      ),
    )
    return new PieceComposite(piece, parent, engine)
  }

  getChildren(): BaseComposite[] {
    return this.piece
      .get('movements')
      .map(movement => new MovementComposite(movement, this, this.engine))
  }

  public getJSON(): JSONObject {
    return this.piece
  }

  cleanCircularReferences(): void {
    this.piece.set('boardItem', null)
  }
}
