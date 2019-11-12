import { TipoPeca } from '../definitions/TipoPeca'
import { Peca } from '../domain/peca/Peca'
import { Cor } from '../definitions/Cor'
import { MapPosicaoPecasBrancas, MapPosicaoPecasPretas } from '../definitions/PosicoesIniciais'
import { ItemTabuleiro } from '../domain/ItemTabuleiro'
import { DefinidorCores } from './DefinidorCores'
import { Cavalo } from '../domain/peca/Cavalo'
import { Peao } from '../domain/peca/Peoes'
import { Bispo } from '../domain/peca/Bispo'
import { Rainha } from '../domain/peca/Rainha'
import { Rei } from '../domain/peca/Rei'
import { Torre } from '../domain/peca/Torre'

const InstanciadorTipoMap: Map<TipoPeca, new (corPeca: Cor) => Peca> = new Map([
  [TipoPeca.PEAO, Peao],
  [TipoPeca.CAVALO, Cavalo],
  [TipoPeca.BISPO, Bispo],
  [TipoPeca.RAINHA, Rainha],
  [TipoPeca.REI, Rei],
  [TipoPeca.TORRE, Torre],
])

export namespace InstanciadorPecas {
  export function instanciar(tipo: TipoPeca, corPeca: Cor): ItemTabuleiro[] {
    const map = corPeca === Cor.BRANCAS ? MapPosicaoPecasBrancas : MapPosicaoPecasPretas
    return map.get(tipo).map(posicao => {
      const clazz = InstanciadorTipoMap.get(tipo)
      const item = new ItemTabuleiro(posicao, DefinidorCores.definir(posicao))
      const peca = new clazz(corPeca)
      item.atribuirPeca(peca)
      return item
    })
  }
}
