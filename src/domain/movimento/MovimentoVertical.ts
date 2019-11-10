import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento } from '../../definitions/Movimento'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  public static offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 0 }]
}
