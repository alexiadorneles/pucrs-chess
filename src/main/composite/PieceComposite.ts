import { Piece } from '../domain/piece/Piece'
import { Composite } from '../definitions/Composite'
import { ReplicationAdapterFactory } from '../domain/adapter/ReplicableObjectAdapter'
import { MovementComposite } from "./MovementComposite";
export class PieceComposite implements Composite {
  constructor(private piece: Piece, private replicationFactory: ReplicationAdapterFactory) {
    this.cleanCircularReferences = this.cleanCircularReferences.bind(this)
  }
  public createElement(): Element {
    const pieceType = (this.piece && this.piece.getKind()) || '';
    const pieceColor = (this.piece && this.piece.getColor()) || '';
    const pieceIcon = document.createElement('i');
    pieceIcon.setAttribute('class', `fas fa-${pieceType} piece ${pieceColor}`);
    return pieceIcon;
  }
  public clone(): Composite {
    const replicationAdapter = this.replicationFactory.createPieceReplicationAdapter();
    const piece = replicationAdapter.replicate(this.piece);
    return new PieceComposite(piece, this.replicationFactory);
  }
  getChildren(): Composite[] {
    const movements = this.piece.getMovements();
    return movements.map(movement => new MovementComposite(movement, this.replicationFactory));
  }
  setChildren(children: Composite[]): void { }

  cleanCircularReferences(): void {
    this.piece.addToItem(null)
  }
}
