import { Board } from '../board/Board'
import { BoardItem } from '../board/BoardItem'
import { JSONObject } from '../../definitions/JSONObject'
import { PieceBuilderMap, MovementBuilderMap } from '../PieceBuilder'
import { Piece } from '../piece/Piece'
import { Movement } from '../movement/Movement'

export interface ReplicableObjectAdapter<T> {
  replicate(object: JSONObject): T
}

export class BoardReplicationAdapter implements ReplicableObjectAdapter<Board> {
  constructor(private itemReplication: ReplicableObjectAdapter<BoardItem>) {
    this.replicate = this.replicate.bind(this)
  }
  replicate(object: JSONObject): Board {
    const board = Object.assign(new Board(), object)
    board.items = board.getAllItems().map(this.itemReplication.replicate)
    return board
  }
}

export class BoardItemReplicationAdapter implements ReplicableObjectAdapter<BoardItem> {
  constructor(private pieceReplication: ReplicableObjectAdapter<Piece>) {
    this.replicate = this.replicate.bind(this)
  }
  replicate(object: JSONObject): BoardItem {
    const item = Object.assign(new BoardItem(object.position, object.color), object)
    this.pieceReplication.replicate(item.getPiece())
    return item
  }
}

export class PieceReplicationAdapter implements ReplicableObjectAdapter<Piece> {
  constructor(private movementReplication: ReplicableObjectAdapter<Movement>) {
    this.replicate = this.replicate.bind(this)
  }

  replicate(object: JSONObject): Piece {
    if (!object) return
    const instantiationFn = PieceBuilderMap.get(object.kind)
    const piece = Object.assign(new instantiationFn(object.color), object)
    piece.setMovements(piece.getMovements().map(this.movementReplication.replicate))
    return piece
  }
}

export class MovementReplicationAdapter implements ReplicableObjectAdapter<Movement> {
  replicate(object: JSONObject): Movement {
    const model = new MovementBuilderMap[object.kind]()
    return Object.assign(model, object)
  }
}

export class ReplicationAdapterFactory {
  public createBoardReplicationAdapter(): ReplicableObjectAdapter<Board> {
    return new BoardReplicationAdapter(this.createItemReplicationAdapter())
  }

  public createItemReplicationAdapter(): ReplicableObjectAdapter<BoardItem> {
    return new BoardItemReplicationAdapter(this.createPieceReplicationAdapter())
  }

  public createPieceReplicationAdapter(): ReplicableObjectAdapter<Piece> {
    return new PieceReplicationAdapter(this.createMovementReplicationAdapter())
  }

  public createMovementReplicationAdapter(): ReplicableObjectAdapter<Movement> {
    return new MovementReplicationAdapter()
  }
}
