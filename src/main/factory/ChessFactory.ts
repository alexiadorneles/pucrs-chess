import { BoardComposite } from '../composite/BoardComposite'
import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Board, BoardAttributes } from '../domain/board/Board'
import { ChessEngine } from '../ChessEngine'

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
