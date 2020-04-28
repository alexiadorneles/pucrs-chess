import _ from 'lodash'
import { Tabuleiro } from 'main/domain/Tabuleiro'
import { Color } from '../../definitions/Cor'
import { Position, MovementKind } from '../../definitions/Movement'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Movimento } from '../movimento/Movimento'

export abstract class Peca {
  protected itemTabuleiro: ItemTabuleiro
  protected tipo: TipoPeca
  protected movimentos: Movimento[]
  protected cor: Color
  protected vaiPraTras: boolean

  constructor(tipo: TipoPeca, cor: Color, movimentos: Movimento[], vaiPraTras: boolean) {
    this.tipo = tipo
    this.cor = cor
    this.movimentos = movimentos
    this.vaiPraTras = vaiPraTras
  }

  public getMovimentos(): Movimento[] {
    return this.movimentos
  }

  public setMovimentos(movimentos: Movimento[]): void {
    this.movimentos = movimentos
  }

  public isVaiPraTras(): boolean {
    return this.vaiPraTras
  }

  public getItemTabuleiro(): ItemTabuleiro {
    return this.itemTabuleiro
  }

  public getTabuleiro(): Tabuleiro {
    return this.itemTabuleiro.getTabuleiro()
  }

  public simularMovimento(): Position[] {
    const posicaoAtual = this.getItemTabuleiro().getPosicao()
    const posicoes = this.movimentos.map(movimento => movimento.simularMovimento(posicaoAtual, this.getTabuleiro()))
    return _.flatten(posicoes)
  }

  public adicionarAoItem(item: ItemTabuleiro): void {
    this.itemTabuleiro = item
  }

  public getCor(): Color {
    return this.cor
  }

  public getTipo(): TipoPeca {
    return this.tipo
  }
}
