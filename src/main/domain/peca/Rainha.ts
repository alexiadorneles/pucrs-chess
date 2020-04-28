import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Rainha extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(PieceKind.QUEEN, cor, movimentos, true)
  }
}
