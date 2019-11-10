import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { Movimento } from '../movimento/Movimento'

export class Peao extends Peca {
  constructor(cor: Cor, movimentos: Movimento[]) {
    super(TipoPeca.PEAO, cor, movimentos)
  }
}
