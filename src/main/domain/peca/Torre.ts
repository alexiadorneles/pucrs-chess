import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Torre extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal()]
    super(PieceKind.TOWER, cor, movimentos, true)
  }
}
