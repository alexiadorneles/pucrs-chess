import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 0, linha: 1 }]
}
