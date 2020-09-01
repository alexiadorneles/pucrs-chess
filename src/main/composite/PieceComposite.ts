import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Piece } from '../domain/piece/Piece'
import { PieceBuilderMap } from '../domain/PieceBuilder'
import { MovementComposite } from './MovementComposite'
export class PieceComposite implements Composite {
  constructor(private piece: Piece) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
  }
  public createElement(): Element {
    const pieceType = (this.piece && this.piece.getKind()) || ''
    const pieceColor = (this.piece && this.piece.getColor()) || ''
    const pieceIcon = document.createElement('i')
    pieceIcon.setAttribute('class', `fas fa-${pieceType} piece ${pieceColor}`)
    return pieceIcon
  }

  public static createFromJSON(object: JSONObject): Composite {
    if (!object) return
    const instantiationFn = PieceBuilderMap.get(object.kind)
    const piece = Object.assign(new instantiationFn(object.color), object)
    piece.setMovements(
      piece.getMovements().map(mov => (MovementComposite.createFromJSON(mov) as any).movement),
    )
    return new PieceComposite(piece)
  }

  getChildren(): Composite[] {
    const movements = this.piece.getMovements()
    return movements.map(movement => new MovementComposite(movement))
  }

  setChildren(children: Composite[]): void {}

  cleanCircularReferences(): void {
    this.piece.addToItem(null)
  }
}
