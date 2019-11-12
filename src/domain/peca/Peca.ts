import { Movimento } from '../movimento/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'

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

  public mover(): Posicao[] {
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
