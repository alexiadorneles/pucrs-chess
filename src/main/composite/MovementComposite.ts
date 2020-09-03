import { Composite, BaseComposite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Movement, MovementAttributes } from '../domain/movement/Movement'
import { MovementBuilderMap } from '../domain/PieceBuilder'
import { PieceAttributes } from '../domain/piece/Piece'
import { ChessEngine } from '../ChessEngine'
import { Model } from '../definitions/Model'
export class MovementComposite implements Composite<MovementAttributes> {
  constructor(
    private movement: Movement,
    private parent: Composite<PieceAttributes>,
    private engine: ChessEngine,
  ) {
    this.movement.set('control', this.movement)
  }

  public getModel(): Model<MovementAttributes> {
    return this.movement
  }

  public getParent(): Composite<PieceAttributes> {
    return this.parent
  }

  public createElement(): Element {
    return null
  }

  public static createFromJSON(
    object: JSONObject,
    parent: Composite<PieceAttributes>,
    engine: ChessEngine,
  ): Composite<MovementAttributes> {
    const model = new MovementBuilderMap[object.kind]()
    const movement = Object.assign(model, object)
    return new MovementComposite(movement, parent, engine)
  }

  cleanCircularReferences(): void {
    throw new Error('Method not implemented.')
  }

  public getJSON(): JSONObject {
    return this.movement
  }

  getChildren(): BaseComposite[] {
    return []
  }
}
