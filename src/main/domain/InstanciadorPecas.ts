import { Color } from '../definitions/Cor'
import { MapPosicaoPecasBrancas, MapPosicaoPecasPretas } from '../definitions/PosicoesIniciais'
import { TipoPeca } from '../definitions/TipoPeca'
import { DefinidorCores } from './DefinidorCores'
import { ItemTabuleiro } from './ItemTabuleiro'
import { Bispo } from './peca/Bispo'
import { Cavalo } from './peca/Cavalo'
import { Peao } from './peca/Peao'
import { Peca } from './peca/Peca'
import { Rainha } from './peca/Rainha'
import { Rei } from './peca/Rei'
import { Torre } from './peca/Torre'
import { TipoMovimento } from '../definitions/Movimento'
import { MovimentoDiagonal } from './movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from './movimento/MovimentoHorizontal'
import { MovimentoVertical } from './movimento/MovimentoVertical'
import { MovimentoL } from './movimento/MovimentoL'

export const InstanciadorTipoMap: Map<TipoPeca, new (corPeca: Color) => Peca> = new Map([
  [TipoPeca.PEAO, Peao],
  [TipoPeca.CAVALO, Cavalo],
  [TipoPeca.BISPO, Bispo],
  [TipoPeca.RAINHA, Rainha],
  [TipoPeca.REI, Rei],
  [TipoPeca.TORRE, Torre],
])

export const InstanciadorMovimentoMap = {
  [TipoMovimento.DIAGONAL]: MovimentoDiagonal,
  [TipoMovimento.HORIZONTAL]: MovimentoHorizontal,
  [TipoMovimento.VERTICAL]: MovimentoVertical,
  [TipoMovimento.L]: MovimentoL,
}

export namespace InstanciadorPecas {
  export function instanciar(tipo: TipoPeca, corPeca: Color): ItemTabuleiro[] {
    const map = corPeca === Color.GREY ? MapPosicaoPecasBrancas : MapPosicaoPecasPretas
    return map.get(tipo).map(posicao => {
      const clazz = InstanciadorTipoMap.get(tipo)
      const item = new ItemTabuleiro(posicao, DefinidorCores.definirCorDoItem(posicao))
      const peca = new clazz(corPeca)
      item.atribuirPeca(peca)
      return item
    })
  }
}
