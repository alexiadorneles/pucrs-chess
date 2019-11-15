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

export class Rainha extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.RAINHA, cor, movimentos, true)
  }

  // public simularMovimento(): Posicao[] {
  //   return
  // }

  // public calculateMoviment(tabuleiro: Tabuleiro): void {
  //   this.possibleMoves = _.flatten(this.movimentos.map(moviment =>
  //     calculatePossibleMoviment(this.getItemTabuleiro().getPosicao(), tabuleiro, moviment.getTipo()))
  //   )
  // }
}
