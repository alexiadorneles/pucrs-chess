import { Movimento } from './Movimento'
import { TipoMovimento, OffsetMovimento } from '../../definitions/Movimento'

export class MovimentoDiagonal extends Movimento {
  constructor() { super(TipoMovimento.DIAGONAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 1 }]
}
