import { JSONObject } from '../definitions/JSONObject'
import {
  ReplicationAdapterFactory,
} from '../domain/adapter/ReplicableObjectAdapter'
import { BoardComposite } from "../composite/BoardComposite"
import { Board } from '../domain/board/Board'

export interface ChessFactory {
  createBoardFromJSON(board: JSONObject): BoardComposite
  createInitialBoard(): BoardComposite
}

export class ChessFactoryImpl implements ChessFactory {
  constructor(private boardAdapterFactory: ReplicationAdapterFactory) {}
  createBoardFromJSON(loaded: JSONObject): BoardComposite {
    return new BoardComposite(loaded as Board, this.boardAdapterFactory)
  }

  createInitialBoard(): BoardComposite {
    return new BoardComposite(null, this.boardAdapterFactory)
  }
}
