import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Peca } from './Peca'

export class Rei extends Peca {
  constructor(cor: Color) {
    const movimentos = [new VerticalMovement(), new HorizontalMovement(), new DiagonalMovement()]
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
