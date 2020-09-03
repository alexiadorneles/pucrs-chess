import { JSONObject } from '../definitions/JSONObject'
import { MovementBuilderMap } from '../factory'
import { Model, Movement, MovementAttributes, PieceAttributes } from '../models'
import { BaseComposite, Composite } from './Composite'
export class MovementComposite implements Composite<MovementAttributes> {
  constructor(private movement: Movement, private parent: Composite<PieceAttributes>) {
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
  ): Composite<MovementAttributes> {
    const model = new MovementBuilderMap[object.kind]()
    const movement = Object.assign(model, object)
    return new MovementComposite(movement, parent)
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
