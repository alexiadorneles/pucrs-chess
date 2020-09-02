import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Movement } from '../domain/movement/Movement'
import { MovementBuilderMap } from '../domain/PieceBuilder'
export class MovementComposite implements Composite {
  constructor(private movement?: Movement) {}
  public createElement(): Element {
    return null
  }

  public static createFromJSON(object: JSONObject): Composite {
    const model = new MovementBuilderMap[object.kind]()
    const movement = Object.assign(model, object)
    return new MovementComposite(movement)
  }

  cleanCircularReferences(): void {
    throw new Error('Method not implemented.')
  }

  public getJSON(): JSONObject {
    return this.movement
  }

  getChildren(): Composite[] {
    return []
  }

  setChildren(children: Composite[]): void {}
}
