import { Color } from '../definitions/Color'
import { WhitePiecesPositionMap, BlackPiecesPositionMap } from '../definitions/InitialPositions'
import { MovementKind } from '../definitions/Movement'
import { PieceKind } from '../definitions/PieceKind'
import { ColorAdapter } from './DefinidorCores'
import { ItemTabuleiro } from './ItemTabuleiro'
import { DiagonalMovement } from './movement/DiagonalMovement'
import { HorizontalMovement } from './movement/HorizontalMovement'
import { LMovement } from './movement/LMovement'
import { VerticalMovement } from './movement/VerticalMovement'
import { Bispo } from './peca/Bispo'
import { Cavalo } from './peca/Cavalo'
import { Peao } from './peca/Peao'
import { Peca } from './peca/Peca'
import { Rainha } from './peca/Rainha'
import { Rei } from './peca/Rei'
import { Torre } from './peca/Torre'

export const PieceBuilderMap: Map<PieceKind, new (color: Color) => Peca> = new Map([
  [PieceKind.PAWN, Peao],
  [PieceKind.KNIGHT, Cavalo],
  [PieceKind.BISHOP, Bispo],
  [PieceKind.QUEEN, Rainha],
  [PieceKind.KING, Rei],
  [PieceKind.TOWER, Torre],
])

export const MovementBuilderMap = {
  [MovementKind.DIAGONAL]: DiagonalMovement,
  [MovementKind.HORIZONTAL]: HorizontalMovement,
  [MovementKind.VERTICAL]: VerticalMovement,
  [MovementKind.L]: LMovement,
}

export namespace PieceBuilder {
  export function build(kind: PieceKind, pieceColor: Color): ItemTabuleiro[] {
    const map = pieceColor === Color.GREY ? WhitePiecesPositionMap : BlackPiecesPositionMap
    return map.get(kind).map(position => {
      const clazz = PieceBuilderMap.get(kind)
      const item = new ItemTabuleiro(position, ColorAdapter.defineItemColor(position))
      const peca = new clazz(pieceColor)
      item.atribuirPeca(peca)
      return item
    })
  }
}
