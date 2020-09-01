import { Movement } from '../domain/movement/Movement'
import { Composite } from '../definitions/Composite'
import { ReplicationAdapterFactory } from '../domain/adapter/ReplicableObjectAdapter'
export class MovementComposite implements Composite {
  constructor(private movement: Movement, private replicationFactory: ReplicationAdapterFactory) { }
  public createElement(): Element {
    return null;
  }
  public clone(): Composite {
    const replicationAdapter = this.replicationFactory.createMovementReplicationAdapter();
    const movement = replicationAdapter.replicate(this.movement);
    return new MovementComposite(movement, this.replicationFactory);
  }
  getChildren(): Composite[] {
    return [];
  }
  setChildren(children: Composite[]): void { }
}
