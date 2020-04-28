import { Color } from '../../definitions/Cor'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Rainha extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.RAINHA, cor, movimentos, true)
  }
}
