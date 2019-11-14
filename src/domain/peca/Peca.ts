import { Movimento } from '../movimento/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import _ from 'lodash'

export abstract class Peca {
  protected itemTabuleiro: ItemTabuleiro
  protected tipo: TipoPeca
  protected movimentos: Movimento[]
  protected cor: Cor
  protected vaiPraTras: boolean

  constructor(tipo: TipoPeca, cor: Cor, movimentos: Movimento[], vaiPraTras: boolean) {
    this.tipo = tipo
    this.cor = cor
    this.movimentos = movimentos
    this.vaiPraTras = vaiPraTras
  }

  public getItemTabuleiro(): ItemTabuleiro {
    return this.itemTabuleiro
  }

  public podeMover(posicao: Posicao, ocupada: boolean): boolean {
    const isPosicaoOcupadaPorEstaPeca = _.isEqual(posicao, this.getItemTabuleiro().getPosicao())
    return ocupada ? isPosicaoOcupadaPorEstaPeca : true
  }

  public simularMovimento(): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    return this.movimentos
      .map(movimento => movimento.simularMovimento(posicaoPeca, this.vaiPraTras))
      .reduce((aggregation, movimento: Posicao[]) => aggregation.concat(movimento), [])
  }

  public adicionarAoItem(item: ItemTabuleiro): void {
    this.itemTabuleiro = item
  }

  public getCor(): Cor {
    return this.cor
  }

  public getTipo(): TipoPeca {
    return this.tipo
  }
}
