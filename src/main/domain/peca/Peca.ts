import _ from 'lodash'
import { Tabuleiro } from 'main/domain/Tabuleiro'
import { Cor } from '../../definitions/Cor'
import { Posicao, TipoMovimento } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ItemTabuleiro } from '../ItemTabuleiro'
import { Movimento } from '../movimento/Movimento'

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

  public isVaiPraTras(): boolean {
    return this.vaiPraTras
  }

  public getItemTabuleiro(): ItemTabuleiro {
    return this.itemTabuleiro
  }

  private calculatePossibleMoviment = ({ linha, coluna }: Posicao, tipoMovimento: TipoMovimento): Posicao[] => {
    const moviments: Posicao[] = []
    let movimentoColuna
    let movimentoLinha
    if (tipoMovimento == TipoMovimento.HORIZONTAL) {
      let hasPiece = false
      movimentoColuna = coluna + 1
      while (!hasPiece) {
        const nextMoviment = { linha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoColuna >= 7) break
        else movimentoColuna = movimentoColuna + 1
      }
      hasPiece = false
      movimentoColuna = coluna - 1
      while (!hasPiece) {
        const nextMoviment = { linha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada({ linha: linha, coluna: movimentoColuna })
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoColuna <= 0) break
        else movimentoColuna = movimentoColuna - 1
      }
      return moviments
    } else if (tipoMovimento == TipoMovimento.VERTICAL) {
      let hasPiece = false
      movimentoLinha = linha + 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha >= 7) break
        else movimentoLinha = movimentoLinha + 1
      }
      hasPiece = false
      movimentoLinha = linha - 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna: coluna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha <= 0) break
        else movimentoLinha = movimentoLinha - 1
      }
      return moviments
    } else {
      let hasPiece = false
      movimentoLinha = linha + 1
      movimentoColuna = coluna - 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha >= 7 || movimentoColuna <= 0) break
        else {
          movimentoLinha = movimentoLinha + 1
          movimentoColuna = movimentoColuna - 1
        }
      }
      hasPiece = false
      movimentoLinha = linha - 1
      movimentoColuna = coluna + 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha <= 0 || movimentoColuna >= 7) break
        else {
          movimentoLinha = movimentoLinha - 1
          movimentoColuna = movimentoColuna + 1
        }
      }
      hasPiece = false
      movimentoLinha = linha + 1
      movimentoColuna = coluna + 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha >= 7 || movimentoColuna >= 7) break
        else {
          movimentoLinha = movimentoLinha + 1
          movimentoColuna = movimentoColuna + 1
        }
      }
      hasPiece = false
      movimentoLinha = linha - 1
      movimentoColuna = coluna - 1
      while (!hasPiece) {
        const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
        hasPiece = this.getItemTabuleiro().getTabuleiro().isPosicaoOcupada(nextMoviment)
        if (!hasPiece && this.getItemTabuleiro().getTabuleiro().isPosicaoExistente(nextMoviment)) {
          moviments.push(nextMoviment)
        }
        if (movimentoLinha <= 0 || movimentoColuna <= 0) break
        else {
          movimentoLinha = movimentoLinha - 1
          movimentoColuna = movimentoColuna - 1
        }
      }
      return moviments
    }
  }

  public simularMovimento(): Posicao[] {
    return _.flatten(this.movimentos.map(moviment =>
      this.calculatePossibleMoviment(this.getItemTabuleiro().getPosicao(), moviment.getTipo()))
    )
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
