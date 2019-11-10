import { Movimento } from './Movimento'
import { TipoMovimento, OffsetMovimento } from '../../definitions/Movimento'

export class MovimentoL extends Movimento {
  constructor() { super(TipoMovimento.L) }
  protected offsetMovimentos: OffsetMovimento[] = [
    { coluna: 2, linha: 1 },
    { coluna: 1, linha: 2 },
  ]
}
