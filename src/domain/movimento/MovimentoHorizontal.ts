import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 0 }]
}
