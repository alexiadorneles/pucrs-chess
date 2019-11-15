import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'
import { Posicao, TipoMovimento } from '../../definitions/Movimento'
import _ from 'lodash'
import { Tabuleiro } from 'domain/Tabuleiro'

const calculatePossibleMoviment = (posicao, table, movimentStyle) => {
  let x = posicao.linha
  let y = posicao.coluna
  let moviments = []
  let yMove
  let xMove
  if (movimentStyle == TipoMovimento.HORIZONTAL) {
    let hasPiece = false
    yMove = y + 1
    while (!hasPiece) {
      let nextMoviment = [x, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: x, coluna: yMove })
      moviments.push(nextMoviment)
      if (yMove >= 7) break
      else yMove = yMove + 1
    }
    hasPiece = false
    yMove = y - 1
    while (!hasPiece) {
      let nextMoviment = [x, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: x, coluna: yMove })
      moviments.push(nextMoviment)
      if (yMove <= 0) break
      else yMove = yMove - 1
    }
    return moviments
  } else if (movimentStyle == TipoMovimento.VERTICAL) {
    let hasPiece = false
    xMove = x + 1
    while (!hasPiece) {
      let nextMoviment = [xMove, y]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: y })
      moviments.push(nextMoviment)
      if (xMove >= 7) break
      else xMove = xMove + 1
    }
    hasPiece = false
    xMove = x - 1
    while (!hasPiece) {
      let nextMoviment = [xMove, y]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: y })
      moviments.push(nextMoviment)
      if (xMove <= 0) break
      else xMove = xMove - 1
    }
    return moviments
  } else {
    let hasPiece = false
    xMove = x + 1
    yMove = y - 1
    while (!hasPiece) {
      let nextMoviment = [xMove, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove })
      moviments.push(nextMoviment)
      if (xMove >= 7 || yMove <= 0) break
      else {
        xMove = xMove + 1
        yMove = yMove - 1
      }
    }
    hasPiece = false
    xMove = x - 1
    yMove = y + 1
    while (!hasPiece) {
      let nextMoviment = [xMove, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove })
      moviments.push(nextMoviment)
      if (xMove <= 0 || yMove >= 7) break
      else {
        xMove = xMove - 1
        yMove = yMove + 1
      }
    }
    hasPiece = false
    xMove = x + 1
    yMove = y + 1
    while (!hasPiece) {
      let nextMoviment = [xMove, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove })
      moviments.push(nextMoviment)
      if (xMove >= 7 || yMove >= 7) break
      else {
        xMove = xMove + 1
        yMove = yMove + 1
      }
    }
    hasPiece = false
    xMove = x - 1
    yMove = y - 1
    while (!hasPiece) {
      let nextMoviment = [xMove, yMove]
      hasPiece = table.isPosicaoOcupada({ linha: xMove, coluna: yMove })
      moviments.push(nextMoviment)
      if (xMove <= 0 || yMove <= 0) break
      else {
        xMove = xMove - 1
        yMove = yMove - 1
      }
    }
    return moviments
  }
}

export class Rainha extends Peca {
  private possibleMoves
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.RAINHA, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    const posicao = this.getItemTabuleiro().getPosicao()
    const extensaoVertical = ExtensorPosicoes.extenderVertical([posicao])
    return extensaoVertical.concat(ExtensorPosicoes.extenderHorizontal([posicao])).concat(ExtensorPosicoes.extenderDiagonal(posicao))
  }

  public calculateMoviment(tabuleiro: Tabuleiro): void {
    this.possibleMoves = _.flatten(this.movimentos.map(moviment =>
      calculatePossibleMoviment(this.getItemTabuleiro().getPosicao(), tabuleiro, moviment.getTipo()))
    )
  }
}
