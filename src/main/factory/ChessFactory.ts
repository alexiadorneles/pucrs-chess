import { ChessEngine } from '../ChessEngine'
import { BoardComposite, Composite } from '../composite'
import { JSONObject } from '../definitions/JSONObject'
import { Board, BoardAttributes } from '../models'

export interface ChessFactory {
  createBoardFromJSON(board: JSONObject): Composite<BoardAttributes>
  createInitialBoard(): BoardComposite
}

export class ChessFactoryImpl implements ChessFactory {
  constructor(private engine: ChessEngine) {}
  createBoardFromJSON(loaded: JSONObject): Composite<BoardAttributes> {
    return BoardComposite.createFromJSON(loaded, this.engine)
  }

  createInitialBoard(): BoardComposite {
    return new BoardComposite(new Board(), this.engine)
  }
}
