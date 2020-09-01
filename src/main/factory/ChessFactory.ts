import { BoardComposite } from '../composite/BoardComposite'
import { Composite } from '../definitions/Composite'
import { JSONObject } from '../definitions/JSONObject'
import { Board } from '../domain/board/Board'

export interface ChessFactory {
  createBoardFromJSON(board: JSONObject): Composite
  createInitialBoard(): BoardComposite
}

export class ChessFactoryImpl implements ChessFactory {
  createBoardFromJSON(loaded: JSONObject): Composite {
    return BoardComposite.createFromJSON(loaded)
  }

  createInitialBoard(): BoardComposite {
    return new BoardComposite(new Board())
  }
}
