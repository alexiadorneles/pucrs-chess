import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoDiagonal } from '../movement/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movement/MovimentoHorizontal'
import { MovimentoVertical } from '../movement/MovimentoVertical'
import { Peca } from './Peca'

export class Rainha extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(PieceKind.QUEEN, cor, movimentos, true)
  }
}
