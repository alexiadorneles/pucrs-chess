import { Color } from '../definitions/Color'
import { MapPosicaoPecasBrancas, MapPosicaoPecasPretas } from '../definitions/InitialPositions'
import { MovementKind } from '../definitions/Movement'
import { TipoPeca } from '../definitions/TipoPeca'
import { ColorAdapter } from './DefinidorCores'
import { ItemTabuleiro } from './ItemTabuleiro'
import { MovimentoDiagonal } from './movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from './movimento/MovimentoHorizontal'
import { MovimentoL } from './movimento/MovimentoL'
import { MovimentoVertical } from './movimento/MovimentoVertical'
import { Bispo } from './peca/Bispo'
import { Cavalo } from './peca/Cavalo'
import { Peao } from './peca/Peao'
import { Peca } from './peca/Peca'
import { Rainha } from './peca/Rainha'
import { Rei } from './peca/Rei'
import { Torre } from './peca/Torre'

export const PieceBuilderMap: Map<TipoPeca, new (color: Color) => Peca> = new Map([
  [TipoPeca.PEAO, Peao],
  [TipoPeca.CAVALO, Cavalo],
  [TipoPeca.BISPO, Bispo],
  [TipoPeca.RAINHA, Rainha],
  [TipoPeca.REI, Rei],
  [TipoPeca.TORRE, Torre],
])

export const MovementBuilderMap = {
  [MovementKind.DIAGONAL]: MovimentoDiagonal,
  [MovementKind.HORIZONTAL]: MovimentoHorizontal,
  [MovementKind.VERTICAL]: MovimentoVertical,
  [MovementKind.L]: MovimentoL,
}

export namespace PieceBuilder {
  export function build(kind: TipoPeca, pieceColor: Color): ItemTabuleiro[] {
    const map = pieceColor === Color.GREY ? MapPosicaoPecasBrancas : MapPosicaoPecasPretas
    return map.get(kind).map(position => {
      const clazz = PieceBuilderMap.get(kind)
      const item = new ItemTabuleiro(position, ColorAdapter.defineItemColor(position))
      const peca = new clazz(pieceColor)
      item.atribuirPeca(peca)
      return item
    })
  }
}
