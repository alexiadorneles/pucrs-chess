import _ from 'lodash'
import { Tabuleiro } from 'main/domain/Tabuleiro'
import { Color } from '../../definitions/Color'
import { Position, MovementKind } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Movement } from '../movement/Movement'

export abstract class Peca {
  protected itemTabuleiro: ItemTabuleiro
  protected tipo: PieceKind
  protected movimentos: Movement[]
  protected cor: Color
  protected vaiPraTras: boolean

  constructor(tipo: PieceKind, cor: Color, movimentos: Movement[], vaiPraTras: boolean) {
    this.tipo = tipo
    this.cor = cor
    this.movimentos = movimentos
    this.vaiPraTras = vaiPraTras
  }

  public getMovimentos(): Movement[] {
    return this.movimentos
  }

  public setMovimentos(movimentos: Movement[]): void {
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
    const posicoes = this.movimentos.map(movimento => movimento.executeSimulation(posicaoAtual, this.getTabuleiro()))
    return _.flatten(posicoes)
  }

  public adicionarAoItem(item: ItemTabuleiro): void {
    this.itemTabuleiro = item
  }

  public getCor(): Color {
    return this.cor
  }

  public getTipo(): PieceKind {
    return this.tipo
  }
}
