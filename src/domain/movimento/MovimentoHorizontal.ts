import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  public static offsetMovimentos: OffsetMovimento[] = [{ coluna: 0, linha: 1 }]
}
