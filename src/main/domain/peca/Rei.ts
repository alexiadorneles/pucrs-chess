import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoDiagonal } from '../movement/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movement/MovimentoHorizontal'
import { MovimentoVertical } from '../movement/MovimentoVertical'
import { Peca } from './Peca'

export class Rei extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(PieceKind.KING, cor, movimentos, true)
  }

  public simularMovimento(): Position[] {
    const posicaoInicial = this.getItemTabuleiro().getPosicao()
    const tabuleiro = this.getTabuleiro()
    const posicoes = this.movimentos.map(movimento =>
      movimento.getMovementOffsets()
        .map(offset => movimento.createNewPositionBasedOnOffset(posicaoInicial, offset))
        .filter(posicao => tabuleiro.isPosicaoExistente(posicao))
        .filter(posicao =>
          !tabuleiro.isPosicaoOcupada(posicao) ||
          tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial))
    )

    return _.flatten(posicoes)
  }

}
