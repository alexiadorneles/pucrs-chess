import { Movimento } from '../movimento/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Cor } from '../../definitions/Cor'

export abstract class Peca {
  private itemTabuleiro: ItemTabuleiro
  private tipo: TipoPeca
  private movimentos: Movimento[]
  private cor: Cor

  constructor(tipo: TipoPeca, cor: Cor, movimentos: Movimento[]) {
    this.tipo = tipo
    this.cor = cor
    this.movimentos = movimentos
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
